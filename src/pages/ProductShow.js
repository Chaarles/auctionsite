import React, { useState, useEffect } from 'react';
import Counter from '../components/Counter'
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    backgroundStyle: {
        backgroundColor: "skyblue",
    },
    loadingStyle : {
        display: 'block',
	    margin: '4% auto',
    },
}));

function ProductShow(props) {

    const classes = useStyles();
    const [data] = useState(props.location.state.data);
    const [bidCtn, setBidCtn] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        Axios.get(`http://localhost:4000/api/ctn?id=${data._id}`)
        .then(res=>{
            setBidCtn(res.data.ctn);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    },[data])

    const showTagList = data.tags.map((obj) => {
        return <span key={obj}><Chip variant="outlined" size="small" label={obj} />&nbsp;</span>
    })
    return (
        <div>
            {isLoading 
                ? <CircularProgress className={classes.loadingStyle}/> 
                : <Container className={classes.backgroundStyle} maxWidth="sm">
                <Grid container>
                    <Grid item xs={6}>
                        <h3>{data.category}</h3>
                        <h3>요청사항 : {data.detail}<br />{showTagList}</h3>
                        <h3>희망 작업 완료일 : 협의</h3>
                        <h3> 입찰 인원 : {bidCtn} </h3>
                    </Grid>
                    <Grid item xs={6}>
                        {bidCtn >= 10 
                        ? <h1>경매 마감</h1> 
                        :
                        <>
                        <h3><Counter data={data}/></h3>
                        <Button variant="outlined" component={Link} to={{ pathname: `./${data._id}/bidding`, state: { data: data } }}>
                            입찰하기
                        </Button>
                        </>
                        }
                        
                    </Grid>
                </Grid>
            </Container>}
        </div>
    )
}

export default ProductShow;