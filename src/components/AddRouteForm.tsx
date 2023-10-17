import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Card } from 'antd';
import { Route } from '../types'; // Define your Route type
import { addRoute } from '../features/routes/routeSlice';

const { TextArea } = Input;

interface AddRouteFormProps {
}

const AddRouteForm: React.FC<AddRouteFormProps> = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Route>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    length: 0,
    isFavorite: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("💅🏼 ~ e:", e)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRoute = () => {
    dispatch(addRoute(formData));
  };

  return (
    <Card title="Add a New Route">
      <Form>
        <Form.Item label="Name">
          <Input
            name="name"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Short Description">
          <Input
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Full Description">
          <TextArea
            name="fullDescription"
            value={formData.fullDescription}
            // onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Length (miles)">
          <Input
            type="number"
            name="length"
            value={formData.length}
            onChange={handleInputChange}
          />
        </Form.Item>
        {/* MAP */}
        <Button onClick={handleAddRoute}>Add Route</Button>
      </Form>
    </Card>
  );
};

export default AddRouteForm;
