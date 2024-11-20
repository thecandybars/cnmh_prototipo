import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  navigate("/siloe/calle");
  return <div></div>;
}
