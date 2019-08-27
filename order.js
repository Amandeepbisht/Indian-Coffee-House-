var cappecino={
	menu:"menu_1",
	item_name:"cappecino",
	options:{
		size:["--","Small...$1.75","Medium...$1.95","Large...$2.10"],
		add_espresso:["--","1","2","3"]
	},
	order:{
		size:[],
		add_espresso:[]
	}
}

var regular_coffee={
	menu:"menu_2",
	item_name:"regular_coffee",
	options:{
		size:["--","Small...$1.25","Medium...$1.65","Large...$1.95"],
		sugar:["--","1","2","3"],
		milk:["--","1","2","3"],
		cream:["--","1","2","3"]
	},
	order:{
		'size':[],
		'sugar':[],
		'milk':[],
		'cream':[]
	}
}

var hot_chocolate={
	menu:"menu_3",
	item_name:"hot_chocolate",
	options:{
		size:["--","Medium...$2.49","Large...$2.99","Extra Large...$3.29"],
		add_espresso:["--","1","2","3"]
	},
	order:{
		size:[],
		add_espresso:[]
	}
}

var bagel=function(menu,item_name,options,order){
	this.menu=menu,
	this.item_name=item_name,
	this.options={
		butter:["--","single","double"],
		toasted:["yes","no"],
		cream_cheese:["--","single...$0.35","double...$0.50"]
	},
	this.order={
		butter:[],
		toasted:[],
		cream_cheese:[]
	}
}


var whole_wheat=new bagel("menu_1","whole_wheat")
var plain=new bagel("menu_2","plain")
var everything=new bagel("menu_3","everything")
var cinnamon_raisin= new bagel("menu_4","cinnamon_raisin")

var iced_capp={
	menu:"menu_1",
	item_name:"iced_capp",
	options:{
		size:["--","Small...$1.28","Medium...$1.65","Large...$1.99"],
		extra_shot:["--","caramel","chocolate","vanilla"]
	},
	order:{
		size:[],
		extra_shot:[]
	}
}
var frappecino={
	menu:"menu_2",
	item_name:"frappecino",
	options:{
		size:["--","Small...$1.48","Medium...$1.85","Large...$2.35"],
		extra_shot:["--","caramel","chocolate","vanilla"]
	},
	order:{
		size:[],
		extra_shot:[]
	}
}

var iced_coffee={
	menu:"menu_3",
	item_name:"iced_coffee",
	options:{
		size:["--","Small...$1.38","Medium...$1.65","Large...$2.10"],
		extra_shot:["--","caramel","chocolate","vanilla"]
	},
	order:{
		size:[],
		extra_shot:[]
	}
}
//**************************************************************************************************************************
var data={
	hot_order:[],
	cold_order:[],
	bagel_order:[],
	brownie_order:[]
}
var hot_obj=function(id,name,size,add_espresso){
	this.id=id,
	this.name=name,
	this.size=size,
	this.add_espresso=add_espresso
}
var bgl_obj=function(id,name,cream_cheese){
	this.id=id,
	this.name=name,
	this.cream_cheese=cream_cheese
}
var cold_obj=function(id,name,size,extra_shot){
	this.id=id,
	this.name=name,
	this.size=size,
	this.extra_shot=extra_shot
}
//**************************************************************************************************************************	
var html='';
var disp_menu=function(obj){ //creates the hot-drinks menu thats is visible at the initialized screen
	var x;
	html+='<div class="';
	html+=obj.menu+'">';
	if (obj==whole_wheat||obj==everything||obj==plain||obj==cinnamon_raisin){
		html+='<input type="checkbox" class="'+obj.item_name+'_check">' // whole_wheat_check,plain_check,everything_check
	}

	html+='<label " class="' +obj.item_name+ '_label">' +obj.item_name.toUpperCase()+ '</label>';
	for (i in obj.options){
		html+='<label for="' +obj.item_name+ '_' +i+ '" class="' +i+ '" >'+i.toUpperCase()+'</label>';
		html+='<select id="' +obj.item_name+ '" class="' +obj.item_name+ '_' +i+ '">';
		for (opt in obj.options[i]){
			
			html+='<option value="' +opt+ '">' +obj.options[i][opt]+ '</option>'
		}
		html+='</select>'
	}
	html+='</div>'
	return html
}	


//var list=[cappecino,regular_coffee,hot_chocolate]
var list=[[whole_wheat,plain,everything,cinnamon_raisin],[cappecino,regular_coffee,hot_chocolate],[frappecino,iced_capp,iced_coffee]]
var y,input,x;
var diversity

var getInput=function(){//FUNCTION THAT STORES THE VALUE OF INPUT 
		if (clk_h==1){diversity=1}
		else if (clk_b==1){diversity=0}
		else if (clk_c==1){diversity=2}
		
		for (i in list[diversity]){
			y=('.'+list[diversity][i].item_name);	//.cappecino or //.regular_coffee
			x=list[diversity][i].item_name;
			for (opt in list[diversity][i].options){
				input=(y+'_'+opt)		//.cappecino_size or .cappecino_add_Espresso
				var myList=document.querySelector(input);
				var txt=myList.options[myList.selectedIndex].text;
				var val=myList.options[myList.selectedIndex].value;

				
				if (opt=='size'){
						list[diversity][i].order[opt].push(txt,val);
					}
				else{
						list[diversity][i].order[opt].push(txt);
					}
					
				//console.log(input)	
			}
		}
}	

var id		// these are the IDs of each order that will stored as an object	
var storeObj=function(){// stores data as an object into a list
	
	for (i in list[diversity]){ // the value of diversity is been defined at line 109 & 110 and stored at line 106
		if (clk_h==1){
			if (id==undefined){id=0}
			if (list[diversity][i].order.size[0]!="--"){
				id+=1;	
				if (list[diversity][i].order.add_espresso==undefined||list[diversity][i].order.add_espresso[0]=='--'){
					data.hot_order.push(new hot_obj(id,list[diversity][i].item_name,list[diversity][i].order.size[0],'0'))
				}
				else{
					data.hot_order.push(new hot_obj(id,list[diversity][i].item_name,list[diversity][i].order.size[0],list[diversity][i].order.add_espresso[0]))
				}
			}
		}
		else if (clk_b==1){
			if (id==undefined){id=0}
			var cond='.'+list[diversity][i].item_name+'_check'
			if(document.querySelector(cond).checked){
				id+=1
				data.bagel_order.push(new bgl_obj(id,list[diversity][i].item_name,list[diversity][i].order.cream_cheese[0]))
			}
			
			
		}
		else if (clk_c==1){
			if (id==undefined){id=0}
				if (list[diversity][i].order.size[0]!="--"){
				id+=1;	
				if (list[diversity][i].order.extra_shot==undefined||list[diversity][i].order.extra_shot[0]=='--'){
					data.cold_order.push(new cold_obj(id,list[diversity][i].item_name,list[diversity][i].order.size[0],'0'))
				}
				else{
					data.cold_order.push(new cold_obj(id,list[diversity][i].item_name,list[diversity][i].order.size[0],'1.25'))
				}
			}
		}
	
	
	}
}

var empty=function(){ // clears the order list from the objects
	var pick
	if (clk_h==1){pick=1}
	else if (clk_b==1){pick=0}
	else if (clk_c==1){pick=2}
	
	for (i in list[pick]){
		for (x in list[pick][i].order){
			(list[pick][i].order[x].length=0);
		}
	}
	pay_list=[]
	owe=0;
}
//var list=[[whole_wheat,plain,everything,cinnamon_raisin],[cappecino,regular_coffee,hot_chocolate]]
var init=function(){ // initializes all the values of dropdown lists
	var pick
	if (clk_h==1){
		pick=1
		str='.'
		for (elem in list[pick]){
			str+=list[pick][elem].item_name;
			str+='_' // .regular_coffee_
			
			for (choice in list[pick][elem].options){
					str+=choice
					document.querySelector(str).value='0';
					str='.'
					str+=list[pick][elem].item_name;
					str+='_'
					
			}
			str='.';
		}
		
	}
	else if (clk_b==1){
		pick=0
		str='.'
		for (elem in list[pick]){
			str+=list[pick][elem].item_name
			str+='_check'
			
			document.querySelector(str).checked=false;
			str='.';
			str+=list[pick][elem].item_name;
			str+='_'
			for (choice in list[pick][elem].options){
					str+=choice
					document.querySelector(str).value='0';
					str='.'
					str+=list[pick][elem].item_name;
					str+='_'
					
			}
			str='.';
		}
	}
	else if (clk_c==1){
		pick=2
		str='.'
		for (elem in list[pick]){
			str+=list[pick][elem].item_name;
			str+='_' // .frappecino_
			
			for (choice in list[pick][elem].options){
					str+=choice
					document.querySelector(str).value='0';
					str='.'
					str+=list[pick][elem].item_name;
					str+='_'
					
			}
			str='.';
		}
	}

	clk_1=0;
}
	
	
var clk_2 // clk2 is basically an id on each HTML

//function that displays order
var display=function(){ // create an HTML string to display the order
	var menu=[cappecino,regular_coffee,hot_chocolate]
	var bagel=[whole_wheat,plain,everything,cinnamon_raisin]
	var cold=[frappecino,iced_capp,iced_coffee]
	var disp='';	
	//clk_2=0;
	if (clk_h==1){
		for (options in menu){ // cappecino or regular_coffee or hot_chocolate
			
			if (clk_2==undefined){clk_2=0}
			if (menu[options].order.size[0]!='--'){
				clk_2+=1; 
				
				//disp+='<div class="'+menu[options].item_name+'" id="order_'+clk_2+'">'
				disp+='<div class="'+menu[options].item_name+'_order" id="hot_order_'+clk_2+'">';
				disp+='<div class="_name">'+menu[options].item_name.toUpperCase()+':</div>';
				
				for (choice in menu[options].order){ // size or add_Espresso or milk or cream or sugar
					if (menu[options].order[choice]!='--'){
						if (choice=='add_espresso')
						disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+menu[options].order[choice]+' * $0.50</div>';
						else if (choice=='size'){
						disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+menu[options].order[choice][0]+'</div>';
						}
						else{
							disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+menu[options].order[choice]+'</div>';
						}
					}	
				}
				disp+='<div class="remove"><button class="delete">DEL</button>';
				disp+='</div></div></div>'
			}
			//aman=clk_2;
		}
	}

	else if (clk_c==1){
		for (options in cold){
			if (clk_2==undefined){clk_2=0}
			if (cold[options].order.size[0]!='--'){
				clk_2+=1;	
				disp+='<div class="'+cold[options].item_name+'_order" id="cold_order_'+clk_2+'">';
				disp+='<div class="_name">'+cold[options].item_name.toUpperCase()+':</div>';
			
				for (choice in cold[options].order){ // size or extra_shot 
						if (cold[options].order[choice][0]!='--'){
							if (choice=='extra_shot'){
							disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+cold[options].order[choice]+'...$1.25</div>';
							}
							else{
							disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+cold[options].order[choice][0]+'</div>';
							}
						}	
					}
				disp+='<div class="remove"><button class="delete">DEL</button>';
				disp+='</div></div></div>'				
				
			}
		}
	} 	
	
	else if (clk_b==1){
		for (options in bagel){
			if (clk_2==undefined){clk_2=0}
			var cond='.'+bagel[options].item_name+'_check'
			if(document.querySelector(cond).checked){
				clk_2+=1
				console.log('aman')
				disp+='<div class="'+bagel[options].item_name+'_order" id="bgl_order_'+clk_2+'">';
				disp+='<div class="_name">'+bagel[options].item_name.toUpperCase()+'</div>';
				disp+='<div class="price">BAGEL...$2.35</div>'
				for (choice in bagel[options].order){
					if (bagel[options].order[choice]!='--'){
						disp+='<div class="_'+choice+'">'+choice.toUpperCase()+'----  '+bagel[options].order[choice]+'</div>';
					}
				}
				disp+='<div class="remove"><button class="delete">DEL</button>';
				disp+='</div></div></div>'
			}
			
		}
	
	
	}
	

	
	return(disp);
}



var pay_list=[]
var payment=function(){ // takes input "data.hot_order" and add thee elements as number in pay_list
	for (i in data.hot_order){
		pay_list.push(Number(data.hot_order[i].size.substring(data.hot_order[i].size.length-4,data.hot_order[i].size.length)))
		
		pay_list.push(Number(data.hot_order[i].add_espresso)*0.50)
	}
	
	for (i in data.bagel_order){
		pay_list.push(2.35)
		if (data.bagel_order[i].cream_cheese=="--"){pay_list.push(0)}
		else if (data.bagel_order[i].cream_cheese!="--"){
			pay_list.push(Number(data.bagel_order[i].cream_cheese.substring(data.bagel_order[i].cream_cheese.length-4,data.bagel_order[i].cream_cheese.length)))
		}
	}
	for (i in data.cold_order){
		pay_list.push(Number(data.cold_order[i].size.substring(data.cold_order[i].size.length-4,data.cold_order[i].size.length)))
		pay_list.push(Number(data.cold_order[i].extra_shot))
		
	}
}



//***************************************************************************************************************************
var clk_h,clk_b,clk_c
clk_h=0;
document.querySelector('.hot_btn').addEventListener("click",function(){
	
	clk_h+=1
	if (clk_h==1){
	//console.log(hot(regular_coffee));
	html=''
	clk_1=0
	clk_b=0
	clk_c=0
	document.querySelector('.hot_menu').innerHTML=disp_menu(cappecino);
	document.querySelector('.hot_menu').innerHTML=disp_menu(regular_coffee);
	document.querySelector('.hot_menu').innerHTML=disp_menu(hot_chocolate);
	document.querySelector('.bagel_menu').innerHTML='';
	document.querySelector('.cold_menu').innerHTML='';
	//document.querySelector('.add').innerHTML='<button class="add_btn">ADD</button>';
	}
	else if (clk_h>1&&html!=''){clk_h=1}
})
clk_b=0
document.querySelector('.bgls').addEventListener("click",function(){
	clk_b+=1;
	if (clk_b==1){
	html='';
	clk_1=0
	clk_h=0;
	clk_c=0
	document.querySelector('.bagel_menu').innerHTML=disp_menu(whole_wheat);
	//console.log(disp_menu(whole_wheat))
	document.querySelector('.bagel_menu').innerHTML=disp_menu(plain);
	document.querySelector('.bagel_menu').innerHTML=disp_menu(everything);
	document.querySelector('.bagel_menu').innerHTML=disp_menu(cinnamon_raisin);
	document.querySelector('.hot_menu').innerHTML='';
	document.querySelector('.cold_menu').innerHTML='';
	}
	else if(clk_b>1&&html!=''){clk_b=1}
})
clk_c=0
document.querySelector('.cold_btn').addEventListener("click",function(){
	clk_c+=1;
	if (clk_c==1){
	html='';
	clk_1=0;
	clk_h=0;
	clk_b=0;
	document.querySelector('.cold_menu').innerHTML=disp_menu(frappecino);
	document.querySelector('.cold_menu').innerHTML=disp_menu(iced_capp);
	document.querySelector('.cold_menu').innerHTML=disp_menu(iced_coffee);
	document.querySelector('.hot_menu').innerHTML=''
	document.querySelector('.bagel_menu').innerHTML=''
	}
	else if (clk_c>1&&html!=''){clk_c=1}
	
})

var clk_1=0;
var owe=0;	
document.querySelector('.add_btn').addEventListener('click',function(){
	clk_1+=1
	if (clk_1==1){
		getInput();
		//getInput();
		/*for (i in list){
			if (list[i].order)
		}*/
		
		due=display()
		console.log(due)
		if (due!=undefined){document.querySelector('.due').innerHTML+=due};
		storeObj();
		payment();
		
		for (bills in pay_list){
			owe+=pay_list[bills];
		}
		owe=(owe.toFixed(2))
		console.log(owe)
		console.log(pay_list)
		document.querySelector('.money').innerHTML='$'+owe;
		empty();
		init();
	}
	
});
document.querySelector('.left').addEventListener('click',function(event){
	var ele,character
	ele=(event.target.parentNode.parentNode.id)
	if (ele){
		character=parseInt(ele[ele.length-1])
		for (i in data.hot_order){
				if (data.hot_order[i].id==character){data.hot_order.splice(i,1)}
		}
		for (x in data.bagel_order){
		if (data.bagel_order[x].id==character){data.bagel_order.splice(x,1)}
		}
		for (x in data.cold_order){
			if (data.cold_order[x].id==character){data.cold_order.splice(x,1)}
		}
		//pay_list=[];
		payment();
		for (bills in pay_list){
			 owe+=pay_list[bills];
		}
		owe=owe.toFixed(2)
		console.log(owe)
		document.querySelector('.money').innerHTML='$'+owe;
		empty();
		console.log(ele,character);
		deleteItem(ele);
	}		
})

var deleteItem=function(selectedId){
	var el=document.getElementById(selectedId)
	el.parentNode.removeChild(el);
}



	

















	
