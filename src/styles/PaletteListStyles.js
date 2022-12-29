const styles = {
    root: {
      width: '100%', 
      backgroundColor: 'blue', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start'
    }, 
    container: {
      width: '50%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'flex-start'
  
    }, 
    nav: {
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%',
      "& a": {
        color: "white"
      }
    },
    palettes: {
      boxSizing: 'border-box', 
      width: '100%',
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 30%)', 
      gridGap: '5%'
    }
  }
  export default styles;