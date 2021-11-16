import react from 'react'

const Quote = ({url}) => {
    return ( 
        <div>
            <p style={{
                margin: 10, 
                fontStyle: 'italic',
                padding: 20
                }}>
                    "{url}"
            </p>
        </div>  
     );
}
 
export default Quote;
