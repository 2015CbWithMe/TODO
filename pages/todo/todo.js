var app = getApp()
var temp
Page({
 
        data:{
            todoval : "",
            newtodo:[],
            donetodo:[],
            curid:"0",
            tabid:"0",
            touchid:'',
            menulist:[
              { name: "UNDONE", icon:"fa fa-circle-o-notch"}, 
              {name:"DONE",icon:"fa fa-check"},
              {name:"TRASH",icon:"fa fa-trash"}],
            selectallChecked:false,
            saiconPath:"../../img/icon_circle-empty.png",
            flag:true,
            fadeup:{},
            startX:'',
            moveX:'',
            slidebtnback:'',
            btnmovestyle:'',
            tabflag:'0',
            publiclist:[],
            deltext:"delete",
            delstyle:"",
            donenum:'',
            doneflag:false,
            scrollheight:""
            // txtdata: '看起来，现在不是携程最危险的时刻。2013年梁建章回归前，携程腹背受敌，遭到包括去哪儿、艺龙在内的对手的猛烈进攻，市值跌至32亿美元，被剔除出纳斯达克100指数。而现在，携程市值超过200亿美元。“当时的携程是一艘千疮百孔的航空母舰，很多高管拿到的期权行权价比市价还贵，不如白纸。在携程高管看来，目前的形势并没有当年那么危急。”一位接近携程的人士告诉《中国企业家》。接受采访的大多数行业人士认为，携程并非看不到持续不断的舆论危机，只是作为中国在线旅游市场的一家独大者，携程更关注的是收入、股价与利润。',
            // txtarr: [],
            // selectclass:'',
            // statenum:"",
            // snum:'-1',
            // marktext:[],
            // startY:'',
            // _index:0,
            // bb:30
        },
     
        // selectedtap: function (e) {
          
        //   var txtarr = this.data.txtarr
        //   var snum = e.currentTarget.dataset.num
        //   this.data.txtarr[snum].state = this.data.txtarr[snum].state == 0 ? 1 :0
        //   var statenum = this.data.txtarr[snum].state
        //   var marktext = this.data.marktext
        //   this.data.txtarr[snum].selectclass = statenum == 1 ? this.data.txtarr[snum].selectclass = 'selected' : this.data.txtarr[snum].selectclass = ''

        //   this.setData({
        //       txtarr,
        //       snum
        //   })
         
        // },
        // moveselectstart:function(e){
        //   var startY = this.data.startY
        //   startY = e.touches[0].pageY
        //  this.setData({
        //         startY
        //  })
        // },
        // moveselect : function(e){
        //   var _move = e.touches[0].pageY
        //   var startY = this.data.startY
        //   var txtarr = this.data.txtarr
        //    var _index = this.data._index
        //   var bb = this.data.bb
        
        //   var aa = _move - startY
        //   console.log(_index)
        //   if(aa > bb){
        //     bb+=30
        //     _index+=1
        //     console.log(_index)
        //     this.data.txtarr[_index].state = 1
        //     this.data.txtarr[_index].selectclass = 'selected'
        //   }
        //     this.setData({
        //       txtarr,
        //       _index,
        //       bb
        //     })
        // },
        // lend:function(e){
          
        //  this.setData({
        //    bb:30
        //  })
          
        // },
    
        btnaction : function(e){
          var index = e.currentTarget.dataset.index
          var btnname = e.currentTarget.dataset.btn
          var moveX = this.data.moveX;
          var btnmovestyle = this.data.delmovestyle
          var newtodo = this.data.newtodo
          var donetodo = this.data.donetodo
          var delstyle = this.data.delstyle
          var deltext = this.data.deltext
          var donenum = this.data.donenum
          var doneflag = this.data.doneflag
          // newtodo.slice(index,1)
        
        if(btnname == "done"){
          donetodo.push({
            title: newtodo[index].title,
            radioIconPath: "../../img/icon_circle-empty.png",
            checked: newtodo[index].cheked,
            style: ""
          })
          doneflag=true
          donenum = donetodo.length
          newtodo.splice(index, 1)
          if (moveX == -180) {
            moveX = 0
            for (var i = 0; i < newtodo.length; i++) {
              newtodo[i].style = "transition:transform .2s;transform:translate3d(" + moveX + "px,0,0)"

            }
          }
        }else{
            delstyle = "position:absolute;right:0;transition:width .4s;width:180px"
           
            deltext = "sure?"
        }
          this.setData({
            newtodo,
            donetodo,
            delstyle,
            deltext,
            btnmovestyle :"width:180px;",
            donenum,
            doneflag
          })

        },
        handletouchstart: function (e) {//触摸开始
          var   startX = this.data.startX
                 startX = e.touches[0].pageX
          var   moveX = this.data.moveX;
          var tabflag = this.data.tabflag
          var publiclist = this.data.publiclist
          var btnmovestyle = this.data.delmovestyle
          //点击列表其他元素后隐藏其他显示的按钮
          var newtodo = this.data.newtodo
          var donetodo = this.data.donetodo
          var index = e.currentTarget.dataset.id
        
            if (tabflag == '0') {
              publiclist = newtodo
            } else {
              publiclist = donetodo
            }
          
            if (moveX == -180 || moveX == -90){
                  moveX =0
              
                  for (var i = 0; i < publiclist.length;i++){
                    publiclist[i].style = "transition:transform .2s;transform:translate3d(" + moveX + "px,0,0)"
                    }
                }
          this.setData({
            startX,
            newtodo,
            moveX,
            donetodo,
            btnmovestyle: "transition:width .2s;width:0px",
            delstyle:'',
            deltext:'delete'
          })
        },
        handletouchmove: function (e) {//触摸进行时
          var dl = e.touches[0].pageX //获取当前pagex
          var startX = this.data.startX
          var moveX = this.data.moveX
          var tabflag = this.data.tabflag
          var btnmovestyle = this.data.delmovestyle
          var moveX = dl - startX    // 获取滑动距离
          var  btnmove =   Math.abs(moveX) //按钮滑动距离
          var  publiclist=this.data.publiclist
          var newtodo = this.data.newtodo //获取手指触摸的哪一项
          var donetodo = this.data.donetodo
          var index = e.currentTarget.dataset.id
          // console.log(newtodo)
          if (tabflag == '0') {
            publiclist = newtodo
          }else{
            publiclist = donetodo
          }
           if (moveX < 0){ //判断滑动方向，向左滑才生效，显示按钮
                 publiclist[index].style = "transform:translate3d(" + moveX +"px,0, 0)"
                 btnmovestyle = "width:" + (btnmove) + "px"
                //  console.log(publiclist)
            }
           this.setData({
                  moveX,
                  newtodo,
                  donetodo,
                  btnmovestyle
                 
            })
        },
        handletouchend:function(e){ //触摸结束
          var moveX = this.data.moveX
          var btnmovestyle = this.data.btnmovestyle
          var tabflag = this.data.tabflag
          var publiclist = this.data.publiclist
          var donetodo = this.data.donetodo
          var newtodo = this.data.newtodo
          var index = e.currentTarget.dataset.id
          if (tabflag == '0') {
            publiclist = newtodo
          } else {
            publiclist = donetodo
          }
          if (moveX < -60) { //触摸结束时小于40就自动显示全部按钮 or 隐藏按钮
                    
                   
                    if(tabflag == '1'){
                      moveX = -90
                      btnmovestyle = "transition:width .4s;width:90px"
                    }else{
                      moveX = -180
                      btnmovestyle = "transition:width .4s;width:180px"
                    }
                    publiclist[index].style = "transition:transform .4s;transform:translate3d(" + moveX + "px,0,0)"
             }else{
                    moveX = 0
                    publiclist[index].style = "transition:transform .4s;transform:translate3d(" + moveX + "px,0,0)"
                    btnmovestyle = "transition:width .4s;width:0px"
                
         }
            this.setData({
              moveX,
              newtodo,
              donetodo,
              btnmovestyle,
            })
          },
        clearcache:function(){
          wx.removeStorage({
            key: 'todolist',
            success: function (res) {
              console.log(res.data)
            }
          })
        },
        menuBgcolor:function(e){
            var curid = this.data.curid //菜单颜色切换 && tab选项卡
            var tbStatus = this.data.tbStatus
             curid =  e.currentTarget.dataset.num
             var publiclist = this.data.publiclist
             var tabflag = this.data.tabflag
             var donetodo = this.data.donetodo
             var newtodo = this.data.newtodo
             var moveX = this.data.moveX
             var btnmovestyle = this.data.btnmovestyle
             if (tabflag == '0') {
               publiclist = newtodo
             } else {
               publiclist = donetodo
             }
             if (moveX == -180) {
               moveX = 0
               for (var i = 0; i < publiclist.length; i++) {
                 publiclist[i].style = "transition:transform .2s;transform:translate3d(" + moveX + "px,0,0)"
               }
             }
             this.setData({
                  curid,
                  newtodo,
                  donetodo,
                  tabflag: curid,
                
             })

        },
        showcheckall: function () {//点击全选展示底部选项栏
          var animation = wx.createAnimation({
                    duration: 400,
                    timingFunction: 'ease',
                  })
          this.animation = animation
          animation.translate3d(0,0,0).step()
              this.setData({
                      flag:false,
                      fadeup: animation.export()
              })
        },
        actiondone : function(e){ //全选里面点击完成后隐藏底部选项栏
          var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
          })
          this.animation = animation
          animation.translate3d(0, "50px", 0).step()
          this.setData({
            flag: true,
            fadeup: animation.export()
          })
        },
        sachangebox:function(e){ //全选事件
          var publiclist = this.data.publiclist
          var newtodo = this.data.newtodo
          var donetodo = this.data.donetodo
          var tabflag = this.data.tabflag
          var selectallChecked = this.data.selectallChecked
          var saiconPath = this.data.saiconPath
          if (tabflag == '0') {
            publiclist = newtodo
          } else {
            publiclist = donetodo
          }
          for (var j = 0; j < publiclist.length; j++) {
            publiclist[j].radioIconPath = publiclist[j].radioIconPath == '../../img/icon_circle-empty.png' ? '../../img/icon_circle-slelected.png' : "../../img/icon_circle-empty.png"
            publiclist[j].checked = publiclist[j].checked == false ? true : false
          }
          this.setData({
              newtodo,
              donetodo,
              selectallChecked:selectallChecked = selectallChecked == false ? true : false,
              saiconPath:saiconPath = saiconPath == '../../img/icon_circle-empty.png' ? '../../img/icon_circle-slelected.png' : "../../img/icon_circle-empty.png"
            })
        },
        getnewdoto : function(e){ //获取input值
            this.setData({
                  todoval : e.detail.value 
            })
        },
 
      addnewtodo : function(e){ //添加todo
          temp =  this.data.newtodo //获取定义的空数组
         var  inpval = this.data.todoval
          if (inpval==""){
            wx.showModal({
                      title: 'tips',
                      content: "sorry , You haven't added anything yet",
                      showCancel:false,
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } 
                      }
                  })
          }else{
            console.log(inpval)
                  temp.push({
                    title: inpval, //将input的值添加到数组
                    radioIconPath: "../../img/icon_circle-empty.png",
                    checked: false,
                    style:''
                  })
                  this.setData({   // 重新赋值 & 清空输入框
                    newtodo: temp,
                    todoval: ''
                  })

                  wx.setStorage({ //设置缓存
                    key: 'todolist',
                    data: temp,
                    success: function (res) {

                      wx.showToast({ //提示框
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
          }
        },
   
        changebox: function (e) { // 点击切换checkbox图片和状态 
            var cur = e.currentTarget.dataset.id;//获取当前点击的data-id
            
                //替换当前选中的img地址
            var newtodo = this.data.newtodo
           
            newtodo[cur].radioIconPath = newtodo[cur].radioIconPath == '../../img/icon_circle-empty.png' ? '../../img/icon_circle-slelected.png' : "../../img/icon_circle-empty.png"
            
            newtodo[cur].checked = newtodo[cur].checked ==false? true : false
                  //重新set newtodo数组
              this.setData({
                newtodo
              })
              console.log(this.data)
        },
       
        onLoad : function(){ //页面载入后取缓存，更新到页面
        
          var _this = this   //this关键字要先获取，因为后面要使用this.setdata，this的指向
          var temp2 = _this.data.newtodo
          var scrollheight =this.data.scrollheight
        //   var txtdata = this.data.txtdata
        //   console.log(txtdata)
        //   var txtarr = this.data.txtarr
        //   txtdata = txtdata.split("。")
        //   // txtarr.push(txtdata)
        //   for (var i = 0; i < txtdata.length;i++){
           
        //     txtarr.push({
        //             text:txtdata.slice(i,i+1),
        //             state:"0",
        //             selectclass:''
        //       })
            
        // }
        
          wx.getStorage({
                key: 'todolist',
                success: function (res) {
                 for(var i=0;i<res.data.length;i++){
                   
                   temp2.push({
                      title:res.data[i].title,
                      radioIconPath: res.data[i].radioIconPath,
                      checked: res.data[i].checked
                     })
                   scrollheight = res.data.length * 55
                 }
           
                _this.setData({  //取到缓存，显示缓存
                        newtodo : temp2,
                        scrollheight
                        // txtarr
                })
             }
           })
       
        }
})