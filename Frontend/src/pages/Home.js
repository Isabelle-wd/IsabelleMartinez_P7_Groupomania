import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

import axios from "axios"; 

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }, 
  avatar: {
    backgroundColor: red[500],
  },
}));

function Home() {
  const classes = useStyles();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let history = useHistory()

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        history.push("/login");
      } else {
          axios.get(
            "http://localhost:3001/posts",{        
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data);
          console.log(listOfPosts);
          setLikedPosts(
            (response.data.likedPosts || []).map((like) => {
              return like.PostId;
            })
          );
        });
    }
            // eslint-disable-next-line
    }, []);

    const likePost = (postId) => {
      axios.post(
        "http://localhost:3001/likes", 
        { PostId: postId },
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(
            listOfPosts.map((post) => {
              if (post.id === postId) {
                if (response.data.liked){
                  return {...post, Likes: [...post.Likes, 0]};
                } else {
                  const likesArray = post.Likes;
                  likesArray.pop();
                  return {...post, Likes: likesArray };
                }
              } else {
                return post;
              }
            })
          )
          if (likedPosts.includes(postId)) {
            setLikedPosts(
              likedPosts.filter((id) => {
                return id !== postId;
              })
            );
          } else {
            setLikedPosts([...likedPosts, postId]);
          }
        }
      )
    };

return (  
    <div>
      {listOfPosts
        ? listOfPosts.map((value, key) => {

  return (
  <Container key={key} >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title= {value.title}        
        />
        <CardMedia
          className={classes.media}
          image={value.url}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {value.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton 
  		      aria-label="add to favorites"
  		      onClick={() => {
              likePost(value.id);
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
          >
            {value.Likes.length}
          </Typography>
          <Button 
            href="#text-buttons" 
            color="primary"
            onClick={() => {
              history.push(`/post/${value.id}`)
            }}>
            Commenter
          </Button>
        </CardActions>                  
      </Card>
  </Container>
            );
          })
        : "loading..."}     
      </div>
    )
  
}

export default Home;