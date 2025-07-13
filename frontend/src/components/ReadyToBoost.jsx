import { useNavigate } from "react-router";

const ReadyToBoost=()=>{
     const navigate=useNavigate();
    return(
        <>
        <div className="min-h-[60vh] bg-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#898AC4] text-center mt-5 mb-10">Ready  To Boost Your Job Search? </h1>
                 <p className=" text-[#898AC4]  text-sm sm:text-base md:text-lg  text-center ">Don't let your resume get lost in the ATS black hole. Optimize it today and start getting the interviews you deserve.</p>
                 <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-10 py-5 mt-10">
                    <button className="bg-[#dcd9f4] text-[#5c4d7d] px-5 py-3 rounded-md hover:bg-[#c2bbf0] transition-all duration-300" onClick={()=>navigate('/app')}> Upload Your Resume </button>
                     <button className="bg-[#b9b4e2]  text-white px-5 py-3 rounded-md  hover:bg-[#a59ce0] transition-all duration-300"> Build ATS Ready Resume </button>
                 </div>

            </div>
         
        </div>
        
        </>
    )

}
export default ReadyToBoost