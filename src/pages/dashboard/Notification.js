import { useEffect, useState } from "react";
import customFetch from "../../utils/axios";
import { resetNotificationCount } from "../../components/NotificationCount";
import useNotification from "../../components/useNotification";
import Wrapper from "../../assets/wrappers/Notification";
//import { StatsContainer, Loading, ChartsContainer } from '../../components';
//import { showStats } from '../../features/allJobs/allJobsSlice';

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const { reset } = useNotification();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await customFetch.get(`/user/notify`);
            setNotifications(response.data);
        } catch (error) {
            console.error("There was an error fetching the notifications!", error);
        }
    };

    const readAllNotifications = async () => {
        try {
            const response = await customFetch.patch(`/user/notifyState`);
            reset();
        } catch (error) {
            console.error("There was an error fetching the notifications!", error);
        }
    };

    const deleteNotification = async (noticeId) => {
        try {
            const response = await customFetch.delete(`/user/notify/${noticeId}`);
            setNotifications((prevNotifications) => 
                prevNotifications.filter(notification => notification.id !== noticeId)
            );
        } catch (error) {
            console.error("There was an error fetching the notifications!", error);
        }
    }

    return (
        <Wrapper>
            <div>
                <h1>Notifications</h1>
                <button className="readall" onClick={() => readAllNotifications()}>Read All</button>
                <table>
                    <thead>
                        <tr>
                            <th className="message-column">Message</th>
                            <th className="isread-column">Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map(notification => (
                            <tr key={notification.id}>
                                <td>{notification.text}</td>
                                <td>{notification.read ? 'Read' : 'Unread'}</td>
                                <td>
                                    {/* <button onClick={() => markAsRead(notification.id)}>Mark as Read</button> */}
                                    <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};
