import { Button, Flex } from "antd"
import { FullscreenOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const HeaderContent = () => {
    return (
        <>
            <Flex gap="small" justify="center">
                <FullscreenOutlined className="logo" />
                <span className="logo">SAUNTER</span>
            </Flex>
            <Button type="primary">
                <Link to="/add">
                    Add Path
                </Link>
            </Button>
        </>
    )
}

export default HeaderContent;