import axios from "axios";
import { baseAdminUrl,baseDocUrl,baseUserUrl } from "./ConstUrls";

const Userinstance=axios.create({
    baseURL:baseUserUrl
})

const adminInstance = axios.create({
    baseURL: baseAdminUrl,
  });
  
  const doctorInstance = axios.create({
    baseURL: baseDocUrl,
  });
  
export default Userinstance
export { doctorInstance,adminInstance};
