import { Button } from "@mantine/core";
import {primary45} from "utils/colors";

export default function PagingControl({totalPages, pageNum, setPageNum}) {

 const  container = {
      marginTop: 8,
      marginBottom: 8,
    }
 const  inlineFlex = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
 const  pageInfo = {
      padding: 8,
      color: primary45,
      fontSize: 14,
    }

  return (
    <div style={container}>
      <div style={inlineFlex}>
        <Button
          title={"<"}
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum-1===-1}
        />
        <div style={pageInfo}>
          Page: {pageNum + 1}/{totalPages}
        </div>
        <Button
          title={">"}
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum+1>totalPages-1}
        />
      </div>
    </div>
  );
}
