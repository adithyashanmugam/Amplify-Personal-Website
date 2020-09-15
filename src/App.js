import React, { Fragment, useState, useEffect, useRef } from 'react'
import { makeStyles, AppBar, IconButton, Typography, Grid, sizing, Button, ButtonGroup, Hidden,
         ThemeProvider, Tabs, Tab, Box , FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import DownloadIcon from '@material-ui/icons/GetApp';
import './test.css'
import theme from './theme'
import AboutMe from './aboutme'
import {LinkedIn, GitHub} from '@material-ui/icons'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'

const scrollToRef = (ref) => {
  console.log(document.documentElement.scrollTop)
  console.log(ref.current.offsetTop)
  
  window.scroll(0, ref.current.offsetTop)
}

export default (props) => {
  const [openResume, setOpenResume] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [navValue, setNavValue] = useState('home')

  const homeref = useRef(null)
  const aboutref = useRef(null)
  const expref = useRef(null)
  const contactref = useRef(null)

  useEffect(()=>{
    const handleScroll = event => {
      if(Math.abs(homeref.current.offsetTop - document.documentElement.scrollTop) < 100) {
        setNavValue('home')
      }
      if(Math.abs(aboutref.current.offsetTop - document.documentElement.scrollTop) < 100) {
        setNavValue('about')
      }
      if(Math.abs(expref.current.offsetTop - document.documentElement.scrollTop) < 100) {
        setNavValue('experience')
      }
      if(Math.abs(contactref.current.offsetTop - document.documentElement.scrollTop) < 150) {
        setNavValue('contact')
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
      console.log('hi')
    }
  }, [])

  const mapping = {
    'home': homeref,
    'about': aboutref,
    'experience': expref,
    'contact': contactref
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleResumeButton = event => {
    setOpenResume(prevVal => !prevVal)
  }

  const handleNavChange = event => {
    console.log(homeref)
    scrollToRef(mapping[event.target.value])
    setNavValue(event.target.value)
  }

  function TabPanel(props) {
    const { children, value, index,} = props
    const { position, date, description } = children
    console.log(description)

    const mapDescription = () => description.map(d => <li>{d}</li>)
  
    return (
      <div
        hidden={value !== index}
        className='tab-content'
      >
        {value === index && (
          <div className='tab-description'>
            <Typography color='secondary' style={{fontSize: '20px'}}>{position}</Typography>
            <Typography color='secondary' style={{fontSize: '17px'}}>{date}</Typography>
            <ul>
              {mapDescription()}
            </ul>
            
          </div>
          
        )}
      </div>
    )
  }

  // const styles = theme => ({
  //   radio: {
  //     '&$checked': {
  //       color: '#4B8DF8'
  //     }
  //   },
  //   checked: {}
  // })

  let render
  render = (
    <ThemeProvider theme={theme}>
      <div className='navbar'>
        <FormControl component='fieldset' >
          <RadioGroup value={navValue} onChange={handleNavChange}>
            <FormControlLabel value='home' control={<Radio />} label={<p>HOME</p>} />
            <FormControlLabel value='about' control={<Radio />} label={<p>ABOUT</p>} />
            <FormControlLabel value='experience' control={<Radio />} label={<p>EXPERIENCE</p>} />
            <FormControlLabel value='contact' control={<Radio />} label={<p>CONTACT</p>} />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='image1' ref={homeref}>
        
          <div className='intro'>
            <p className='intro-text'>HELLO, I'M ADITHYA SHANMUGAM.</p>
            <p className='intro-text-2'>I BUILD THINGS FOR THE WEB.</p>
          </div>

          <a class="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
      </div>

      <div className='aboutme' ref={aboutref}>
          <img className='headshot' src={require('./headshot.jpg')} />
          <Grid container direction='column' alignItems='center' style={{marginBottom: '550px'}}>
            <Grid item>
              <p className='aboutme-header'>About Me</p>
            </Grid>
            <Grid item>
              <div className='aboutme-description'>
                <p>Hi! I'm Adithya, a software developer based in San Jose, CA.</p>
                <p>I specialize in building products for the web, whether they be static websites or dynamic web applications. I enjoy creating visually stunning experiences on all of my projects.</p>
                <p>Currently, I attend UC Irvine remotely and am interning at myElth. My interests go far beyond web development and I am always looking for new projects!</p>
                <p>Recently, I've worked with:</p>
                <ul>
                  <li>JavaScript</li>
                  <li>HTML & CSS</li>
                  <li>React & Redux</li>
                  <li>Wordpress</li>
                  <li>Node.js</li>
                  <li>Tensorflow</li>
                </ul>
              </div>
            </Grid>
          </Grid>
          
      </div>

      <div className='experience' ref={expref}>
       <div className='tabs-container' >
        <p className='tabs-header'>Professional Experiences</p>
        <Tabs
            orientation='vertical'
            value={tabValue}
            onChange={handleChangeTab}
            className={'tabs-options'}
          >
            <Tab label='myElth' value={0} />
            <Tab label='VisitorsCoverage' value={1}  />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {{
              position: 'Web Development + Content Management Intern',
              date: 'March 2020 - August 2020',
              description: [
                'Developed web application that allowed doctors to virtually manage appointments and availability.',
                'Designed and built telemedicine platform on Twilio backend for peer to peer video chat.',
                'Worked with React JS and Redux libraries to deliver responsive and dynamic web functionality.',
                'Created content for multiple pages on company website.'
              ]
            }}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {{
              position: 'Front End Web Development Intern',
              date: 'July 2019 - September 2019',
              description: [
                'Developed Chrome extension to compare international money transfer rates between countries.',
                'Worked with vanilla javascript, HTML, and CSS to build product.'
              ]
            }}
          </TabPanel>
       </div>   
      </div> 

      <div className='contact' ref={contactref}>
        <p className='contact-header'>Contact Me</p>
        <div className='contact-description'>
          <p>If you feel you could use my services, lets get in touch! I am always looking for new and exciting opportunities, so feel free to reach out through one of the channels below. I'll do my best to get back to you quickly!</p>
          <p>Email: adithyavshanmugam@gmail.com</p>
          <Grid container directon='row' justify='center'>
            <Grid item><IconButton onClick={ () => window.open('https://www.linkedin.com/in/adithya-shanmugam-033069171/', '_blank') }><LinkedIn /></IconButton></Grid>
            <Grid item><IconButton onClick={ () => window.open('https://github.com/adithyashanmugam', '_blank') }><GitHub /></IconButton></Grid>
          </Grid>
        </div>
        
        {/* <AmplifySignOut /> */}
      </div>
    </ThemeProvider>
  )
  return render
}



{/* <div className='navbar'>        
          <Grid container direction='row' alignItems='center'>
            <Grid item container direction='row' sm={2} justify='flex-start'>
              <Grid item>
                <img src={require('./logo_a.png')} />
              </Grid>
            </Grid>
            
            <Grid item container direction='row' sm={10} justify='flex-end' alignItems='center' spacing={1}>
              
              <Grid item><Button color='primary'>My Self</Button></Grid>
              <Grid item><Button color='primary'>My Experiences</Button></Grid>
              <Grid item><Button color='primary'>My Work</Button></Grid>
              <Grid item><Button color='primary'>My Contact</Button></Grid>
              <Grid item>
                  <Button variant='contained' color='secondary' endIcon={openResume ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} onClick={handleResumeButton}>
                    Resume
                  </Button>
              </Grid>
            </Grid>
          </Grid>
          
        </div> */}