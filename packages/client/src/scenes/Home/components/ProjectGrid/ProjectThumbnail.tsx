import VisibilityChip from '@celluloid/client/src/components/VisibilityChip';
import { ProjectGraphRecord } from '@celluloid/types';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  createStyles,
  Grid,
  Grow,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

const styles = ({ palette, spacing }: Theme) => createStyles({
  card: {
    height: '100%',
    '& a:any-link': {
      textDecoration: 'none'
    },
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  image: {
    height: spacing.unit * 27,
    textAlign: 'center',
    padding: spacing.unit * 6,
    position: 'relative'
  },
  visibilityContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0,
    padding: spacing.unit,
  },
  visibilityChip: {
    backgroundColor: palette.secondary.dark,
    color: 'white',
    margin: spacing.unit
  },
  tagList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: spacing.unit * 3,
  },
  tag: {
    margin: spacing.unit / 2
  },
  iconWrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0
  },
  icon: {
    width: spacing.unit * 7,
    height: spacing.unit * 7,
    color: 'white'
  },
  title: {
    overflow: 'hidden',
    color: 'white',
  },
  titleWrapper: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: spacing.unit * 9,
    padding: spacing.unit * 1.5,
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
});

interface Props extends WithStyles<typeof styles>, ProjectGraphRecord {
  openProject(projectId: string): AnyAction;
}

type State = {
  elevated: boolean
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openProject: (projectId: string) =>
    dispatch(push(`/projects/${projectId}`))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(
  class extends React.Component<Props, State> {

    state = { elevated: false } as State;

    render() {

      const {
        classes,
        id,
        videoId,
        title,
        objective,
        publishedAt,
        collaborative,
        user,
        tags,
        openProject,
        ...otherProps
      } = this.props;

      const onHover = () => {
        this.setState({ elevated: !this.state.elevated });
      };

      const onClick = () => {
        openProject(id);
      };

      return (
        <Grid
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          item={true}
          style={{ textAlign: 'center' }}
        >
          <Grow
            style={{ transformOrigin: '0 0 0' }}
            in={true}
            appear={true}
            key={id}
          >
            <Card
              raised={this.state.elevated}
              className={classes.card}
              onMouseOver={onHover}
              onMouseOut={onHover}
              onClick={() => onClick()}
            >
              <CardMedia
                image={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                className={classes.image}
              >
                <div className={classes.iconWrapper}>
                  <PlayIcon className={classes.icon} />
                </div>
                <div className={classes.visibilityContainer}>
                  <VisibilityChip
                    show={otherProps.public}
                    label="public"
                  />
                  <VisibilityChip
                    show={collaborative}
                    label="collaboratif"
                  />
                </div>
                <div className={classes.titleWrapper}>
                  <Typography
                    className={classes.title}
                    variant="title"
                  >
                    {title}
                  </Typography>
                </div>
              </CardMedia>
              <CardContent>
                <Grid
                  container={true}
                  direction="column"
                  justify="space-between"
                  alignItems="stretch"
                  style={{
                    height: '100%'
                  }}
                >
                  <Grid item={true} xs={12}>
                    <Typography variant="subheading" gutterBottom={true}>
                      <b>{objective}</b>
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <Typography style={{ paddingTop: 24 }}>
                      {user.username}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(publishedAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <div className={classes.tagList}>
                      {tags.map((tag, index) =>
                        <Chip
                          className={classes.tag}
                          key={index}
                          label={tag.name}
                        />
                      )}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      );
    }
  })
);