// import Button from '@material-ui/core/Button'
// import SendIcon from '@material-ui/icons/Send'
// import * as React from 'react'
// import { useState } from 'react'
// import styled from 'styled-components'
// import { useAddMessage } from '../../graphql-hooks/messages-hooks'
// import { useGetMe } from '../../graphql-hooks/users-hooks'

// const name = 'MessageBox'

// const Style = styled.div `
//   display: flex;
//   height: 50px;
//   padding: 5px;
//   width: calc(100% - 10px);

//   .${name}-input {
//     width: calc(100% - 50px);
//     border: none;
//     border-radius: 999px;
//     padding: 10px;
//     padding-left: 20px;
//     padding-right: 20px;
//     font-size: 15px;
//     outline: none;
//     box-shadow: 0 1px silver;
//     font-size: 18px;
//     line-height: 45px;
//   }

//   .${name}-button {
//     min-width: 50px;
//     width: 50px;
//     border-radius: 999px;
//     background-color: var(--primary-bg);
//     margin: 0 5px;
//     margin-right: 0;
//     color: white;
//     padding-left: 20px;

//     svg {
//       margin-left: -3px;
//     }
//   }
// `

// interface MessageBoxProps {
//   chatId: string;
// }

// export default ({ chatId }: MessageBoxProps) => {
//   const [message, setMessage] = useState('')
//   const { data: { me } } = useGetMe()
//   const addMessage = useAddMessage({
//     variables: {
//       chatId,
//       contents: message,
//     }
//   })

//   const onKeyPress = (e) => {
//     if (e.charCode === 13) {
//       submitMessage()
//     }
//   }

//   const onChange = ({ target }) => {
//     setMessage(target.value)
//   }

//   const submitMessage = () => {
//     if (!message) return

//     addMessage()
//     setMessage('')
//   }

//   return (
//     <Style className={name}>
//       <input className={`${name}-input`} type="text" placeholder="Type a message" value={message} onKeyPress={onKeyPress} onChange={onChange} />
//       <Button variant="contained" color="primary" className={`${name}-button`} onClick={submitMessage}>
//         <SendIcon />
//       </Button>
//     </Style>
//   )
// }
