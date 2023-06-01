import { Button } from '@mantine/core';

PagingControl.propTypes = {
  totalPages: PropTypes.number,
  pageNum: PropTypes.number,
  setPageNum: PropTypes.func
};

export default function PagingControl({ totalPages, pageNum, setPageNum }) {
  const styles = {
    container: {
      height: 100,
      padding: 8
    },
    inlineFlex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px'
    },
    pageInfo: {
      padding: 8,
      fontSize: 14
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.inlineFlex}>
        <Button title={'<'} onClick={() => setPageNum(pageNum - 1)} disabled={pageNum - 1 === -1}>
          {'<'}
        </Button>

        <div style={styles.pageInfo}>
          Page: {pageNum + 1}/{totalPages}
        </div>
        <Button title={'>'} onClick={() => setPageNum(pageNum + 1)} disabled={pageNum + 1 > totalPages - 1}>
          {'>'}
        </Button>
      </div>
    </div>
  );
}
