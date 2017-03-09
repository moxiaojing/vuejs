//缓存设置和获取
let storage = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key))||[];
	}
	
}
//console.log(window);
let list = storage.fetch("todolist");//缓存数据的名字设置todolist

//let list = [
//	{
//		title:"eeeee",
//		id:0,
//		isSelected:false//标记没有被选中
//	},
//	{
//		title:"wwwww",
//		id:1,
//		isSelected:false//标记没有被选中
//	},
//	{
//		title:"ttttt",
//		id:3,
//		isSelected:false//标记没有被选中
//	},
//	{
//		title:"bbb",
//		id:4,
//		isSelected:false//标记没有被选中
//	}
//	
//]


//使用vue

var nVue = new Vue({
	el:".todoapp",
	data:{
		list:list,
		todo:"",//表示一条信息或数据
		editingId:"",  //存一下要编辑数据的id
		beforeTitle:"", //记录一下正在编辑的title
		hash:"all"
	},
	watch:{
		list:{
			handler:function(){
				storage.save("todolist",this.list);
			},
			deep:true
		}
	},
	methods:{//方法
		addEvent(){//添加一条信息
			this.list.push({
				title:this.todo,
				id:Math.random(),
				isSelected:false//标记没有被选中
			})
			this.todo="";
		},
		delEvent(id){//删除指定信息
			this.list = this.list.filter( ( (item) => item.id !== id ) );
		},
		editEvent(todo,index){//双击编辑
			//记录一下正编辑的信息的title
			this.beforeTitle = todo.title;
			this.editingId = todo.id;  //数据改变了
			//等待DOM更新
			this.$nextTick(function(){
				this.$refs["editInput"+index][0].focus();
				console.log(this.$refs);
			})
		},
		cancleEdit(todo){//取消编辑
			todo.title = this.beforeTitle;
			this.beforeTitle = "";
			this.editingId = "";
		},
		editDone(todo){//失去焦点，编辑完成
			if(todo.title.trim() === ""){
				this.delEvent(todo.id);	//删除这条信息			
			}
			this.editingId = "";//正在编辑的id清空
		},
		removeEvent(){//删除所有被选中的,只留下没有选中的
			return this.list = this.list.filter( ( item ) => !item.isSelected );
		}
		
	},
	computed:{//属性
		checkAll:{
			get(){//isSelected=true的li
				return this.list.filter( (item) => item.isSelected ).length === this.list.length;
			},
			set(value){//此处value表示all全选框的checked的值---true或false
				this.list.forEach((item)=>{
					item.isSelected = value;
				})
			}
		},
		unSelLen(){//表示没选中的长度
			return this.list.filter( (item) => !item.isSelected ).length;
		},
		selLen(){//表示选中的长度
			return this.list.length-this.unSelLen;
		},
		filterList(){
			var list = [];
			if(this.hash==="all"){
				list = this.list;
			}else if(this.hash==="active"){
				list = this.list.filter( (item)=>!item.isSelected  )
			}else if(this.hash === "completed"){
				list = this.list.filter((item)=>item.isSelected )
			}else{
				list = this.list;
			}
			console.log(this.list);
			return list;
		}
		
	}
	
	
})

window.onhashchange = function(){
	let has = window.location.hash.slice(2);
	nVue.hash = has;
}
window.onhashchange();

























