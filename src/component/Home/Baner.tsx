import SPXN from "./Product/SPXN";

const Baner = () => {
  return (
    <>
    <div className="container" style={{marginTop:"20px"}}>
          <div className="p-b-10" style={{ marginBottom: "20px", display: 'flex', justifyContent: 'center' }}>
            <h3 className="ltext-103 cl5">Sản phẩm xem nhiều</h3>
          </div>
       <div className="row isotope-grid">
            <SPXN />
          </div>
          </div>
    </>
  )
}

export default Baner
