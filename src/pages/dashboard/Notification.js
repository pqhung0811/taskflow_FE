import { useEffect, useState } from "react";
import customFetch from "../../utils/axios";
//import { StatsContainer, Loading, ChartsContainer } from '../../components';
//import { showStats } from '../../features/allJobs/allJobsSlice';

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await customFetch(`/user/notify`);
            setNotifications(response.data);
        } catch (error) {
            console.error("There was an error fetching the notifications!", error);
        }
    };

    // const markAsRead = async (id) => {
    //     try {
    //         await axios.put(`/api/notifications/${id}/read`);
    //         fetchNotifications(); // Refresh the list after marking as read
    //     } catch (error) {
    //         console.error("There was an error marking the notification as read!", error);
    //     }
    // };

    return (
        <div>
            <h1>Notifications</h1>
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
                                {!notification.read && (
                                    // <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                                    <button>Read</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>
                {`
                /* Style for table */
                table {
                    width: 100%;
                    border-collapse: collapse;
                    border-spacing: 0;
                }

                /* Style for table rows */
                tr {
                    border-bottom: 1px solid #ddd;
                }

                td, th {
                    padding: 8px;
                    text-align: left;
                    font-size: 20px;
                    border-right: 1px solid #ddd; /* Add border to the right of each cell */
                }

                td:last-child, th:last-child {
                    border-right: none; /* Remove border from the last cell of each row */
                }

                .message-column {
                    width: 50%; /* Set the width of the Message column */
                    font-weight: bold; /* Make the text bold */
                }

                .isread-column {
                    width: 15%; 
                    font-weight: bold;
                }

                /* Style for unread notifications */
                .unread {
                    position: relative;
                }

                .unread::before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #ff7f0e; /* Choose your color */
                    margin-right: 8px;
                    position: absolute;
                    left: -16px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                /* Style for the button */
                button {
                    padding: 6px 12px;
                    background-color: #007bff; /* Choose your color */
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3; /* Choose your color */
                }

                /* Style for the button when notification is read */
                .read + td button {
                    display: none;
                }
                `}
            </style>
        </div>
    );
};
