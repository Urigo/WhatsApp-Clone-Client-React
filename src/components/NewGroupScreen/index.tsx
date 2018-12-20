// import * as React from 'react'
// import { useState } from 'react'
// import { RouteComponentProps } from 'react-router-dom'
// import styled from 'styled-components'
// import Navbar from '../Navbar'
// import UsersList from '../UsersList'
// import CreateGroupButton from './CreateGroupButton'
// import NewGroupNavbar from './NewGroupNavbar'

// const name = 'NewGroupScreen'

// const Style = styled.div `
//   .UsersList {
//     height: calc(100% - 56px);
//   }
// `

// export default ({ history }: RouteComponentProps) => {
//   const [selectedUsers, setSelectedUsers] = useState([])

//   return (
//     <Style className={`${name} Screen`}>
//       <Navbar>
//         <NewGroupNavbar history={history} />
//       </Navbar>
//       <UsersList selectable onSelectionChange={setSelectedUsers} />

//       {selectedUsers.length && (
//         <CreateGroupButton history={history} users={selectedUsers} />
//       )}
//     </Style>
//   )
// }

export default () => null
