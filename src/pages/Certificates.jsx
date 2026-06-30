import { useEffect, useState } from "react";
import api from "../services/api";

function Certificates(){
  const [certificates,setCertificates] = useState([]);
  const fetchCertificates = async ()=> {
    try{
      const response = await api.get("certificates/");
      console.log(response.data.results);
      setCertificates(response.data.results);

    } catch (error){
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchCertificates();
  }, []);
  return(
    <div className="container mt-5">
      <h2 className="text-center mb-4">Certificates</h2>
      <div className="row">
        {certificates.map((certificate)=>(
          <div className="col-md-4 mb-4" key={certificate.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-center">
                  🏆 Certificate
                </h5>
                <p><strong>Certificate No:</strong> {certificate.certificate_number}</p>
                <p><strong>Issued_Date:</strong>{" "}
                {certificate.issued_at.substring(0,10)}
                </p>
                <p><strong>Student ID:</strong>
                {certificate.student}
                </p>
                <p><strong>Course ID:</strong>
                {certificate.course}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Certificates;