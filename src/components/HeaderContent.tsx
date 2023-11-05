import { Button, Flex } from "antd"
import { FullscreenOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const HeaderContent = () => {
const navigate = useNavigate();
const handleClickAdd = () => {
    navigate('/add')
}
    return (
        <>
            <Flex gap="small" justify="center">
                <FullscreenOutlined className="logo" />
                <span className="logo">SAUNTER</span>
            </Flex>
            <Button type="primary" onClick={handleClickAdd}>
                Add Path
            </Button>
        </>
    )
}

export default HeaderContent;