// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import CheckCircle from '@material-ui/icons/CheckCircle'
// import * as React from 'react'
// import { useState } from 'react'
// import styled from 'styled-components'
// import { useGetUsers } from '../graphql-hooks/users-hooks'
// import { GetUsers } from '../types'

// const name = 'UsersList'

// const Style = styled.div `
//   .${name}-users-list {
//     padding: 0;
//   }

//   .${name}-user-item {
//     position: relative;
//     padding: 7.5px 15px;
//     display: flex;
//     ${props => props.selectable && 'cursor: pointer;'}
//   }

//   .${name}-profile-pic {
//     height: 50px;
//     width: 50px;
//     object-fit: contain;
//     border-radius: 50%;
//   }

//   .${name}-name {
//     padding-left: 15px;
//     font-weight: bold;
//   }

//   .${name}-checkmark {
//     position: absolute;
//     left: 50px;
//     top: 35px;
//     color: var(--primary-bg);
//   }
// `

// interface UsersListProps {
//   selectable?: boolean;
//   onSelectionChange?: (users: GetUsers.Users[]) => void;
// }

// export default (props: UsersListProps) => {
//   const { selectable, onSelectionChange } = {
//     selectable: false,
//     onSelectionChange: () => {},
//     ...props,
//   }

//   const [selectedUsers, setSelectedUsers] = useState([])
//   const { data: { users } } = useGetUsers()

//   const onListItemClick = (user) => {
//     if (!selectable) return

//     if (selectedUsers.includes(user)) {
//       const index = selectedUsers.indexOf(user)
//       selectedUsers.splice(index, 1)
//     }
//     else {
//       selectedUsers.push(user)
//     }

//     setSelectedUsers(selectedUsers)
//     onSelectionChange(selectedUsers)
//   }

//   return (
//     <Style className={name} selectable={selectable}>
//       <List className={`${name}-users-list`}>
//         {users.map(user => (
//           <ListItem className={`${name}-user-item`} key={user._id} button onClick={onListItemClick.bind(null, user)}>
//             <img className={`${name}-profile-pic`} src={user.picture || '/assets/default-profile-pic.jpg'} />
//             <div className={`${name}-name`}>{user.name}</div>

//             {selectedUsers.includes(user) && (
//               <CheckCircle className={`${name}-checkmark`} />
//             )}
//           </ListItem>
//         ))}
//       </List>
//     </Style>
//   )
// }
