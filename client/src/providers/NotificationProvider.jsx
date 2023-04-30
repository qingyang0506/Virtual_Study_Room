import {
  createContext,
  useCallback,
  useContext,
  useState
} from "react"
import {Box, Button, IconButton, Snackbar} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const context = createContext((() => {}))

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("")
  // array of { text: string, onClick: () => void, closeAfterClick: boolean }
  const [options, setOptions] = useState([])
  const [openTextNotification, setOpenTextNotification] = useState(false)
  const [openOptionNotification, setOpenOptionNotification] = useState(false)

  const notify = useCallback(
    (message, option) => {
      setMessage(message)
      if (!option) {
        setOpenTextNotification(true)
      } else {
        setOptions(option)
        setOpenOptionNotification(true)
      }
    },
    [setOpenTextNotification, setMessage]
  )

  return (
    <context.Provider value={notify}>
      {children}
      <Snackbar
        open={openTextNotification}
        autoHideDuration={6000}
        onClose={() => setOpenTextNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpenTextNotification(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Snackbar
        open={openOptionNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        action={
          <Box>
            {options.map(({text, onClick, closeAfterClick}) => (
              <Button
                onClick={() => {
                  onClick()
                  if (closeAfterClick) {
                    setOpenOptionNotification(false)
                  }
                }}
              >
                {text}
              </Button>
            ))}
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setOpenOptionNotification(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
    </context.Provider>
  )
}

export default NotificationProvider

export const useNotification = () => useContext(context)
