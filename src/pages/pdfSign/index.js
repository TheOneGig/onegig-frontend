import { useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { blobToURL } from 'utils/blob';
import { PDFDocument, rgb } from 'pdf-lib';
import PagingControl from './PagingControl';
import { AddSigDialog } from './AddSigDialog';
import { Button } from '@mantine/core';
import DraggableSignature from './DraggableSignature';
import DraggableText from './DraggableText';
import dayjs from 'dayjs';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '0 auto',
    overflow: 'hidden'
  },
  sigBlock: {
    display: 'inline-block',
    border: '1px solid #000'
  },
  documentBlock: {
    maxWidth: 800,
    height: 1110,
    margin: '20px auto',
    border: '1px solid #999'
  },
  controls: {
    maxWidth: 800,
    margin: '0 auto',
    display: 'flex'
  },
  spacer: {
    flex: 1
  }
};

function PdfSign({ file, setFile, setSigningPdf }) {
  const [pdf, setPdf] = useState(null);
  const [autoDate, setAutoDate] = useState(true);
  const [signatureURL, setSignatureURL] = useState(null);
  const [position, setPosition] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);
  const documentRef = useRef(null);

  async function loadFile(file) {
    const response = await fetch(file);
    const blob = await response.blob();
    const URL = await blobToURL(blob);
    setPdf(URL);
  }

  async function insertSignature() {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;

    const y = documentRef.current.clientHeight - (position.y - position.offsetY + 64 - documentRef.current.offsetTop);
    const x = position.x - 160 - position.offsetX - documentRef.current.offsetLeft;

    // new XY in relation to actual document size
    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;

    const pdfDoc = await PDFDocument.load(pdf);

    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];

    const pngImage = await pdfDoc.embedPng(signatureURL);
    const pngDims = pngImage.scale(scale * 0.5);

    firstPage.drawImage(pngImage, {
      x: newX,
      y: newY,
      width: pngDims.width,
      height: pngDims.height
    });

    if (autoDate) {
      firstPage.drawText(`Signed ${dayjs().format('M/d/YYYY')}`, {
        x: newX,
        y: newY - 10,
        size: 12 * scale,
        color: rgb(0.042, 0.042, 0.042)
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)]);

    const URL = await blobToURL(blob);
    setPdf(URL);
    setPosition(null);
    setSignatureURL(null);
  }

  async function insertText(text) {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;

    const y = documentRef.current.clientHeight - (position.y + 12 * scale - position.offsetY - documentRef.current.offsetTop);
    const x = position.x - 166 - position.offsetX - documentRef.current.offsetLeft;

    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;

    const pdfDoc = await PDFDocument.load(pdf);

    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];

    firstPage.drawText(text, {
      x: newX,
      y: newY,
      size: 16 * scale
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)]);

    const URL = await blobToURL(blob);
    setPdf(URL);
    setPosition(null);
    setTextInputVisible(false);
  }

  function resetState() {
    setPdf(null);
    setAutoDate(true);
    setSignatureURL(null);
    setPosition(null);
    setSignatureDialogVisible(false);
    setTextInputVisible(false);
    setPageNum(0);
    setTotalPages(0);
    setPageDetails(null);
  }

  useEffect(() => {
    loadFile(file);
  }, [file]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={styles.container}>
        {signatureDialogVisible ? (
          <AddSigDialog
            autoDate={autoDate}
            setAutoDate={setAutoDate}
            onClose={() => setSignatureDialogVisible(false)}
            onConfirm={(signature) => {
              setSignatureURL(signature);
              setSignatureDialogVisible(false);
            }}
          />
        ) : null}
        {pdf ? (
          <div>
            <div style={styles.controls}>
              {!signatureURL ? (
                <Button mr={8} className="blue-btn" onClick={() => setSignatureDialogVisible(true)}>
                  Add Signature
                </Button>
              ) : null}

              <Button mr={8} className="blue-btn" onClick={() => setTextInputVisible('date')}>
                Add Date
              </Button>
              <Button mr={8} className="blue-btn" onClick={() => setTextInputVisible(true)}>
                Add Text
              </Button>
              <div style={styles.spacer}></div>
              <Button
                mr={8}
                className="green-btn"
                onClick={() => {
                  setFile(pdf);
                  setSigningPdf(false);
                  resetState();
                }}
              >
                Confirm
              </Button>
              <Button
                mr={8}
                className="green-btn"
                onClick={() => {
                  setTextInputVisible(false);
                  setSignatureDialogVisible(false);
                  setSignatureURL(null);
                  setPdf(null);
                  setTotalPages(0);
                  setPageNum(0);
                  setSigningPdf(false);
                  setPageDetails(null);
                }}
              >
                Close
              </Button>

              {pdf ? (
                <Button
                  mr={8}
                  className="green-btn"
                  onClick={() => {
                    downloadURI(pdf, 'file.pdf');
                  }}
                >
                  Download
                </Button>
              ) : null}
            </div>
            <div ref={documentRef} style={styles.documentBlock}>
              {textInputVisible ? (
                <DraggableText
                  initialText={textInputVisible === 'date' ? dayjs().format('M/d/YYYY') : null}
                  onCancel={() => setTextInputVisible(false)}
                  onEnd={setPosition}
                  onSet={insertText}
                />
              ) : null}
              {signatureURL ? (
                <DraggableSignature
                  url={signatureURL}
                  onCancel={() => {
                    setSignatureURL(null);
                  }}
                  onSet={insertSignature}
                  onEnd={setPosition}
                />
              ) : null}
              <Document
                file={pdf}
                onLoadSuccess={(data) => {
                  setTotalPages(data.numPages);
                }}
              >
                <Page
                  pageNumber={pageNum + 1}
                  width={800}
                  onLoadSuccess={(data) => {
                    setPageDetails(data);
                  }}
                />
              </Document>
            </div>
          </div>
        ) : null}
      </div>
      <PagingControl pageNum={pageNum} setPageNum={setPageNum} totalPages={totalPages} />
    </div>
  );
}

PdfSign.propTypes = {
  file: PropTypes.any,
  setFile: PropTypes.func,
  setSigningPdf: PropTypes.func
};

export default PdfSign;
