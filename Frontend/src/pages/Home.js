import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"; 

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
import FavoriteIcon from '@material-ui/icons/Favorite';
import { DeleteOutlined } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "75%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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
      <Container>
        <Grid container spacing={6}>
          {listOfPosts
            ? listOfPosts.map((value, key) => {

            return (
              <Grid item xs={12} key={key}>
                <Card 
                  onClick={() => {
                    history.push(`/post/${value.id}`)
                  }}
                  className={classes.root} 
                  elevation={3}>
                  <CardHeader
                    className={classes.header}
                    action={
                      <IconButton>
                        <DeleteOutlined />
                      </IconButton>
                    }
                    avatar={
                      <Avatar 
                        alt="photo profile" 
                        src="images/profile_pic.png" 
                        className={classes.avatar}>
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
                  <CardActions 
                    spacing={8}>
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
                      size="small"
                      >
                      Commenter
                    </Button>
                  </CardActions>                  
                </Card>
              </Grid>
            );
          })
          : "loading..."}   
        </Grid>  
      </Container>
  )        
}

export default Home;