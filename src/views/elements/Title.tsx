import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

type TitleProps = {
  heading: string
  paragraph?: string
  openModal?: () => void
}

const Title = ({ heading, paragraph, openModal }: TitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          gap: 4,
          mt: '1rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          variant='h2'
          sx={{
            color: 'text.secondry',
            fontWeight: '100'
          }}
        >
          {heading}
        </Typography>

        <Button
          variant='contained'
          sx={{
            height: '30px',
            minWidth: '30px',
            borderRadius: '100%',
            padding: '0px'
          }}
          onClick={() => {
            if (openModal) {
              openModal()
            }
          }}
        >
          <Icon icon='tabler:plus' fontSize={'1rem'} />
        </Button>
      </Box>
      {paragraph && (
        <Typography variant='body2' sx={{ color: 'text.secondry', fontSize: '11px' }}>
          {paragraph}
        </Typography>
      )}
    </Box>
  )
}

export default Title
