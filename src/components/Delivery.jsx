import { useState } from 'react'
import '../sass/dev.scss'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";


export const Delivery = () => {
  const [topDate, setTopDate] = useState("");
  const [order, setOrder] = useState(880);
  const [images, setImages] = useState([null, null, null]);
  const [hideInp, setHideInp] = useState(true);
  const [toAddress, setToAdress] = useState("");
  const [accGetOne, setAccGetOne] = useState("");
  const [accGetTwo, setAccGetTwo] = useState("");
  const [hideAddress, setHideAddress] = useState(true);
  const [firPageHide, setFirPageHide] = useState(true)
  const [secPageHide, setSecPageHide] = useState(true);
  const [amount, setAmount] = useState("");
  const [ship, setShip] = useState("");
  const [getName, setGetName] = useState("");
  const [total, setTotal] = useState("");
  const [amountGet, setAmountGet] = useState("");

  const getAmountShip = (Number(amount) || 0) + (Number(ship) || 0);
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

   const addressOurs = [
    "No 56, CHERAN NAGAR","OPP TO GAS BUNK","KANNAMPALAYAM","COIMBATORE - 641 402","Ph no: +91 9047434455"
   ]
const printRef = useRef();

const validateAndDownload = () => {
  if (!amount || !ship || !topDate || !getName || !total) {
    alert("⚠️ Please fill all required fields before downloading!");
    return;
  }

  // If all fields are filled → allow download
  handleDownload();
};

const isEmpty = (val) => !val || val.trim() === "";

const handleDownload = async () => {
  setHideInp(false);
  setHideAddress(false);

  // wait for DOM to update
  await new Promise(resolve => setTimeout(resolve, 500));

  const pdf = new jsPDF("p", "mm", "a4");

  const firstPage = document.querySelector(".container");
  const secondPage = document.querySelector(".secondContainer");

  const canvas1 = await html2canvas(firstPage, { scale: 2 });
  const img1 = canvas1.toDataURL("image/png");
  pdf.addImage(img1, "PNG", 0, 0, 210, 297);

  pdf.addPage();
  const canvas2 = await html2canvas(secondPage, { scale: 2 });
  const img2 = canvas2.toDataURL("image/png");
  pdf.addImage(img2, "PNG", 0, 0, 210, 297);

  pdf.save("SOWMYZCOUTURE.pdf");

  // restore UI after download
  setHideInp(true);
  setHideAddress(true);
};




 const handleReset = () => {
  setImages([null, null, null]);
  setAmount("");
  setShip("");
  setGetName("");
  setTotal("");
  setToAdress("");
};


  return (
    <div className="wholeContainer">
    <div className="printWrapper" ref={printRef}>
    <div className="container" style={{ display: firPageHide ? "flex" : "none" }}>
      <div className="border">
        <div className="header">
          <div className="titleName">
            <h2>SOWMYZ COUTURE</h2>
          </div>
          <div className="getFirstRow inp">
            <span style={{color:"orange"}} >Order {order} </span>
            <input
             className='amountInp'
             style={{
              width:"120px",
              border: isEmpty(amount) ? "1px solid red" : "transparent"
             }} 
             value={amount}
             onChange={(e)=>setAmount(e.target.value)}
             type="number"
            placeholder='Amount' />
            <span>Shipping:</span>
            <input
             style={{
              width:"155px",
              border: isEmpty(ship) ? "1px solid red" : "transparent"
             }}
             value={ship}
             onChange={(e)=>setShip(e.target.value)}  
             type="number" placeholder='Shippping:' />
            <span>Delivery:</span>
            <input type='date'
            style={{
              width:"100px",
              border: isEmpty(total) ? "1px solid red" : "transparent"
            }}
             value={topDate}
             onChange={(e)=>setTopDate(e.target.value)}
             placeholder='Delivery date:' />
          </div>
          <div className="getSecondRow inp">
            <span style={{marginLeft:"2.5px"}}>Name:</span>
            <input type="text"
             style={{
              border: isEmpty(getName) ? "1px solid red" : "transparent"
             }}
             value={getName}
             onChange={(e)=>setGetName(e.target.value)}
             placeholder='Name' />
            <span >Total:</span>
            <input type="number"
              value={getAmountShip}
              onChange={(e)=>setTotal(e.target.value)}
              style={{marginRight:"100px",
              border: isEmpty(total) ? "1px solid red" : "transparent"
              }}  placeholder='Total' />
            <input type="text" className='empty' disabled />
          </div>
          <div className="getThirdRow inp">
            <span>ACCESSORIES-I :</span>
            <input type="text"
             value={accGetOne}
             onChange={(e)=>setAccGetOne(e.target.value)}
             placeholder='ACCESSORIES-I' />
          </div>
          <div className="getFourthRow inp">
            <span>ACCESSORIES-II : </span>
            <input type="text"
             value={accGetTwo}
             onChange={(e)=>setAccGetTwo(e.target.value)}
            placeholder='ACCESSORIES-II' />
          </div>
          <div className="getFifthRow inp">
            <h5>DATE AND ACCOUNT</h5>
            <select>
              <option value="Gpay">Gpay</option>
              <option value="Raja">Raja</option>
              <option value="SowmyzCouture">SowmyzCouture</option>
            </select>
            <input type="date" 
             value={amountGet}
             onChange={(e)=>setAmountGet(e.target.value)}
             style={{
              border: isEmpty(total) ? "1px solid red" : "transparent"
             }}
            />
          </div>
        </div>
        <div className="centerpage">
          <div className="cenFirst cen">
            <h5 style={{color:"orange"}} >Order {order}</h5>
          </div>
          <div className="cenSec cen">
            <p>MATERIALS AVAILABILITY</p>
            <h6>Delivery Date: <span>{topDate}</span> </h6>
          </div>
          <div className="cenTwoLefAndRigh">
            <div className="leftCen">
              <div className="colCen">
                <span>Name :</span>
                <input type="text"
                  value={getName}
                  onChange={(e)=>setGetName(e.target.value)}
                  placeholder='Customer Name' />
              </div>
              <div className="colCen">
                <span>Dress :</span>
                <input type="text" placeholder='Dress' />
              </div>
              <div className="colCen">
                <span>Age :</span>
                <input type="text" placeholder='Age' />
              </div>
              <div className="colCen">
                <span>Accessory-I :</span>
                <input onChange={setAccGetOne.value} type="text" value={accGetOne} 
                placeholder='Accessories - I' />
              </div>
              <div className="colCen">
                <span>Accessory-II :</span>
                <input onChange={setAccGetTwo.value} type="text" value={accGetTwo} 
                placeholder='Accessories - II' />
              </div>
            </div>
            <div className="righCen">
              <form>
                <table border={1} >
                  <tr>
                  <td>Fabric</td>
                  <td><input type="text" /></td>
                </tr>
                <tr>
                  <td>Measurement</td>
                  <td><input type="text" /></td>
                </tr>
                <tr>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                </tr>
                </table>
              </form>
            </div>
          </div>
        </div>
        <div className="addressBar">
          <div className="addFirst">
            <h5>DELIVERED TO:</h5>
          </div>
          <div className="addThree">
            {/* <input
             value={toAddress}
             onChange={(e)=>setToAdress(e.target.value)}
             placeholder='Enter to address'
             style={{
              width:"150px",
              border:"2px solid #000",
              height:"100px",
              textAlign:"start" ,
              textWrap:"wrap",
              visibility: hideAddress ? "visible" : "hidden"
             }} 
            type="text" /> */}
            <p className='topSideP' 
              style={{ 
              whiteSpace: "pre-line"
             }}>
              {toAddress.split(",")           // split by comma
                .map((line) => line.trim()) // remove extra spaces
                .join("\n")           // join with newline character
              }
            </p>
              <textarea
                value={toAddress}
                style={{
                  textWrap:"wrap",
                  visibility: hideAddress ? "visible" : "hidden"
                }}  
                onChange={(e) => setToAdress(e.target.value)}
                rows={8}
              />

            <p className='botSideP' style={{ whiteSpace: "pre-line" }}>
              <h4
               style={{
                transform:"translateY(40px) translateX(-15px)",
                color:"Darkblue",
                fontSize:"22px"
               }}
              >SOWMYZ COUTURE</h4> <br />
              {addressOurs.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="bottomPage">
          <div className="leftBotPage">
            <form>
              <tr>
                <td>HAIRBAND/CLIP</td>
              </tr>
              <tr>
                <td>BOW</td>
              </tr>
              <tr>
                <td>BOW BELT</td>
              </tr>
              <tr>
                <td>WINGS</td>
              </tr>
              <tr>
                <td>TRAIL</td>
                <td>RUFFEL SIZE</td>
              </tr>
              <tr>
                <td>EARING</td>
              </tr>
              <tr>
                <td>STRAP</td>
              </tr>
              <tr>
                <td>SHOES</td>
              </tr>
            </form>
            <div className="inpGetImages">
              {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e)}
                style={{marginBottom: "10px",
                  display: hideInp ? "block" : "none"
                 }}
              />
            ))}
            </div>
          </div>
          <div className="righBotPage">
            {images.map(
              (img, index) =>
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    style={{ width: "150px", margin:"2px" }}
                  />
                )
            )}
            <h5 style={{color:"orange", transform:"translateY(-130px) translateX(-60px)"}} >Order {order}</h5>
          </div>
        </div>
      </div>
    </div>
    <div className="secondContainer"
     style={{
      display: secPageHide ? "flex" : "none"
     }}>
      <div className="borders">
        <div className="topViewSec">
            <h4>DELIVERED TO : </h4>
            <p className='topSideP' style={{ whiteSpace: "pre-line" }}>
                {toAddress.split(",")           // split by comma
                  .map((line) => line.trim()) // remove extra spaces
                  .join("\n")           // join with newline character
                }
            </p>
        </div>
        <div className="nextViewSecTwo">
          <div className="firRowLet">
            <span>SH-W</span>
            <span>SH-SH</span>
            <span>A</span>
            <span>B</span>
            <span>w</span>
          </div>
          <div className="secRowLet">
            <span>H</span>
            <span>FL</span>
            <span>BN</span>
            <span>SL</span>
            <span>SC</span>
          </div>
          <div className="thirdRowLet">
            <span>W-F</span>
          </div>
          <div className="fouRowLet">
            <h5>Other Req :</h5>
            <h5>Colour of the dress :</h5>
            <span>p</span>
          </div>
        </div>
        <hr />
        <div className="empty"></div>
        <div className="bottomSecPage">
          <form>
            <table>
              <tr>
                <td style={{textDecoration:"underline"}} >CUTTING MEASUREMENT</td>
                <td>

                </td>
                <td style={{textDecoration:"underline"}} >
                  TOP
                </td>
              </tr>
              <tr>
                <td>W</td>
                <td></td>
                <td>LINING</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>SATIN</td>
              </tr>
              <tr>
                <td>B</td>
                <td>CIRCLE</td>
                <td>MAIN FABRIC</td>
              </tr>
              <tr>
                <td>L</td>
                <td>RUFFLE</td>
                <td>NET</td>
              </tr>
              <tr>
                <td>S</td>
              </tr>
              <tr>
                <td>N</td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
    
    </div>  
    <div className="finishUp"
    >
      <button
        onClick={() => {
          setSecPageHide(false);
          setFirPageHide(true);
        }}
      >
        {"<"}
      </button>
      <button className='clBTN' onClick={validateAndDownload}>
        Download
      </button>
      <button className='reBTN' onClick={handleReset}>Reset</button>
      <button
        onClick={() => {
          setFirPageHide(false);
          setSecPageHide(true);
        }}
      >
        {">"}
      </button>
      <button onClick={() => setOrder(prev => prev + 1)}>
        +
      </button>
      <button onClick={() => setOrder(prev => prev - 1)}>
        -
      </button>
    </div>
    </div>
  )
}
