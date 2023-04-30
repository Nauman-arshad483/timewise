import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';
import requireAuth from '../requireAuth';
const UploadTasks = () => {
  const [step, setStep] = useState(1);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId=userData._id;
    const taskData = {
      task,
      description,
      category,
      priority,
      dueDate,
      userId, // add user ID to task data
    };
  
    try {
      console.log("task data..",taskData)
      const response = await fetch('https://pink-nice-walrus.cyclic.app/task/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      console.log(data);
      
      // Reset form
      setStep(1);
      setTask('');
      setDescription('');
      setCategory('');
      setPriority('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="container py-3" style={{ backgroundColor: '#F6F6F6', border: '1px solid #CCCCCC', borderRadius: '5px', maxWidth: '800px' ,marginTop:'2rem' }}>
      <Form onSubmit={step === 2 ? handleSubmit : handleNext}>
        {step === 1 && (
          <>
            <Form.Group controlId="formBasicTask">
              <Form.Label className="text-primary">Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
                style={{ backgroundColor: '#FFFFFF', color: '#333333' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="bg-primary" style={{ backgroundColor: '#0e88a0' ,marginTop:"1rem" }}>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Form.Group controlId="formBasicDescription">
              <Form.Label className="text-primary">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ backgroundColor: '#FFFFFF', color: '#333333' }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label className="text-primary">Category</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Enter task category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', flex: 1, marginRight: '5px' }}
                />
                <FaRegCalendarAlt style={{ fontSize: '20px', color: '#4285F4' }} />
                <Form.Control
                  type="date"
                  placeholder="Due date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  style={{ backgroundColor: '#FFFFFF', color: '#333333', flex: 1, marginLeft: '5px' }}
                  />
                  </div>
                  </Form.Group>
                  
                          <Form.Group controlId="formBasicPriority">
                            <Form.Label className="text-primary" >Priority</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                as="select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                                style={{ backgroundColor: '#FFFFFF', color: '#333333', flex: 1, marginRight: '5px' }}
                              >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </Form.Control>
                              {priority === 'low' && <AiOutlineCheckCircle style={{ fontSize: '20px', color: '#5CB85C' }} />}
                              {priority === 'medium' && <AiOutlineCheckCircle style={{ fontSize: '20px', color: '#F0AD4E' }} />}
                              {priority === 'high' && <AiOutlineCheckCircle style={{ fontSize: '20px', color: '#D9534F' }} />}
                            </div>
                          </Form.Group>
                  
                          <Button variant="primary" type="submit" className="bg-primary" style={{ backgroundColor: '#0e88a0' ,marginTop:"1rem" }}>
                            Submit
                          </Button>
                        </>
                      )}
                       <style>{`
     .bg-primary {
      background-color: #0e88a0 !important;
    }
    .text-primary {
      color: black !important;
    }
      `}</style>
                    </Form>
                  </div>
                  );
                  };
                  
                  export default requireAuth(UploadTasks);