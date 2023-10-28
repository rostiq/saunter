import { Flex } from "antd"
import { FullscreenOutlined } from '@ant-design/icons';
import AddForm from "./AddForm";

const HeaderContent = () => {

    return (
        <>
            <Flex gap="small" justify="center">
                <FullscreenOutlined className="logo" />
                <span className="logo">SAUNTERRR</span>
            </Flex>

            <AddForm />

        </>
    )
}

export default HeaderContent;