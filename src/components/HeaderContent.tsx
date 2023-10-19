import { Button, Flex } from "antd"
import { FullscreenOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Divider, Input, Modal } from 'antd';
import { Space, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { addNewDocument } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import Map from './Map';
import { useAppSelector } from "../app/hooks";
import { selectMarkers, selectTotalLength } from "../features/routes/distanceSlice";
const { Text } = Typography;
const { TextArea } = Input;

const HeaderContent = () => {
    const [isModal, setIsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');

    const navigate = useNavigate()

    const length = useAppSelector(selectTotalLength);
    const markers = useAppSelector(selectMarkers);

    const handleCloseModal = () => {
        setTitle('');
        setShortDescription('');
        setFullDescription('');
        setIsModal(false);
    }

    const handleSubmit = async () => {
        setLoading(true);
        await addNewDocument({ title, shortDescription, fullDescription, length, markers, });
        setLoading(false);
        handleCloseModal();
        navigate('/')
    };
    const openModal = () => {
        setIsModal(true);
    };
    return (
        <>
            <Flex gap="small" justify="center">
                <FullscreenOutlined className="logo" />
                <span className="logo">SAUNTERRR</span>
            </Flex>
            <Button type="primary" onClick={openModal}>
                Add Path
            </Button>
            {isModal &&
                <Modal
                    title="Add new path"
                    open={true}
                    confirmLoading={loading}
                    footer={null}
                    onCancel={handleCloseModal}
                    width={'80vw'}
                >
                    <Divider />
                    <Flex gap="large" align="start" justify="start" >

                        {/* FORM */}

                        <Space direction="vertical" style={{ width: '40%' }}>
                            <Text>Title</Text>
                            <Input placeholder="Text input" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Text>Short description</Text>
                            <TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={160} showCount placeholder="Text area" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                            <Text>Full description</Text>
                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Text area" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} />
                            <Space direction="vertical" align='center' style={{ width: '100%' }}>
                                <Space>
                                    <EnvironmentOutlined />
                                    <Text>Length {length} km</Text>
                                </Space>
                                <Button type="primary" onClick={handleSubmit} loading={loading}>
                                    Add Path
                                </Button>
                            </Space>
                        </Space>

                        {/* MAP */}
                        <div style={{ width: '60%' }} >
                            <Map />
                        </div>

                    </Flex>
                </Modal>
            }
        </>
    )
}

export default HeaderContent;