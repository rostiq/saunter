import React, { useState } from 'react';
import { Button, Divider, Flex, Input, Modal } from 'antd';
import { Space, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { addNewDocument } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import Map from './Map';
const { Text } = Typography;
const { TextArea } = Input;

const AddRoute: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [length, setLength] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate()

  const handleOpenModal = () => {

  }
  const handleCloseModal = () => {
    navigate('/')
  }

  const handleSubmit = async () => {
    setLoading(true);
    await addNewDocument({ title, shortDescription, fullDescription, length });
    setLoading(false);
  };

  return (
      <Modal
        title="Add new path"
        open={true}
        confirmLoading={loading}
        width={'80vw'}
        footer={null}
        onCancel={handleCloseModal}
      >
        <Divider />
        <Flex gap="large" align="start" justify="center" >

          {/* FORM */}

          <Space direction="vertical" style={{ width: '100%' }}>
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

          <Space direction="vertical" style={{ width: '100%' }}>
            <Map />
          </Space>

        </Flex>
      </Modal>
  );
};

export default AddRoute;
