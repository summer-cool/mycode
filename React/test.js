 var Commentbox = React.createClass({
        render:function(){
            return(
                <div>this is a comentbox
                    <Comentform />
                    <CommentList />
                </div>
            );
        }   
    });
    var CommentList = React.createClass({
      render: function() {
        return (
          <div className="commentList">
            <Common author="lee">this is first common</Common>
            <Common rename="jian">this is second common</Common>
          </div>
        );
      } 
    });
    var Comentform = React.createClass({
        render:function(){
            return(
                <div>i am a comentform~~</div>
            );
        }
    });
    var Common = React.createClass({
        render:function(){
            return(
                <div>
                    <div>{this.props.author}</div>
                    <div>{this.props.rename}</div>
                </div>
            );
        }
    })
    React.render(
     <Commentbox />,
     document.getElementById("test")
    );