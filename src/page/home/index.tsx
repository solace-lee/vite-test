import { Button } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function PatientList(props: any) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const buttonList = [{
    path: '/patient/patientList',
    name: '患者列表'
  }, {
    path: '/patient/cornerstone3D',
    name: '勾画'
  }, {
    path: '/patient/mpr',
    name: 'MPR'
  }, {
    path: '/patient/fuse',
    name: '融合'
  }]

  function jumpRouter(path: string) {
    console.log(path);
    navigate(path)
  }

  return <div>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      {buttonList.map(v => {
        return <Button
          key={v.path}
          type={pathname === v.path ? 'primary' : 'default'}
          onClick={() => jumpRouter(v.path)}
        >
          {v.name}
        </Button>
      })}
    </div>
    <Outlet />
  </div>
}

export default PatientList