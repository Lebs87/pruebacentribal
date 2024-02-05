import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
    
  return (
    <div className='position-relative div-loading'>
        <div className='position-absolute top-50 start-50 translate-middle'>
          <SyncLoader color="hsl(12, 100%, 60%)" />
        </div>
    </div>
  )
}

export default Loading
