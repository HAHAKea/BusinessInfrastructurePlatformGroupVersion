//销毁上一个content页面遗留vueContentObject对象实例
if (vueContentObject) getVueObject().$destroy();

// 当前用户能够操作的所有行为
var actions = {'del': {'key':'del','url':'user/delete'},'add': {'key':'add','url':'user/singleAdd'},'update':{'key':'update','url':'user/singleUpdate'},'copy':{'key':'copy','url':'singleAdd'}};
//table column 显示名
var tableColumnsName = ['','ID','昵称','用户名','密码','邮箱地址','电话号码','状态','注册日期','最后修改日期','操作'];
//table column 对应data中的属性名   全选 加 'selection' 项 , 操作 加 'operation' 项。
var tableColumnsKey = ['selection','id','nickname','username','password','email','phone','status','createDate','modifyDate','operation'];
//table 每行需要的按钮 
var tableButtonsOnEachRow = ['rowUpdateButton#修改','rowDeleteButton#删除'];
//综合查询 form
var queryFormItemName = ['ID','昵称','用户名','密码','邮箱地址','电话号码','状态','注册日期'];
var queryFormItems = ['id','nickname','username','password','email','phone','status','createDate'];
var queryFormItemType = ['string','string','string','string','string','string','select#statusList','date'];
//分页取数据url
loadPageableDataUrl = 'user/usersByPage';

setVueContentBeforeCreateFunction(function() {this.statusList = [{value: '1',label: '启用'},{value: '0',label: '禁用'}];});
setVueContentMountedFunction(function () {this.vueTableLoadPageMethod()});
setVueTableColumnsData(tableColumnsName,tableColumnsKey,tableButtonsOnEachRow);
setQueryFormTemplate(queryFormName,queryFormItemName,queryFormItems,queryFormItemType,'queryFormDiv');
setQueryFormContent({id:'',name:'',status: '',createDate: '',username: ''});
setFormContent({id:-1,username: '',password: '',repassword: '',nickname: '',phone: '',email: '',status: '1'});
//格式化table行数据格式
parseValuesOnTableEachRow = function (obj) {
	return {id :obj.id,
		nickname :obj.nickname,
		username :obj.username,
		password :obj.password,
		email :obj.email,
		phone :obj.phone,
		status :obj.status == 1 ? '可用' : '冻结',
		createDate:formatDate(obj.createDate,true),
		modifyDate:formatDate(obj.modifyDate,true)};
}

var generalValidataionContent = {
	'username': [{trigger: 'blur',type: 'string', required: true, pattern: /^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/, message: '用户名称必须为长度6至12位之间以字母、特殊字符(·)或数字字符组成的字符串!'},{validator: this.validateFunction, trigger: 'blur',unique:'user/checkUsernameUnique',message: '用户名已被占用'}],
	'password': [{trigger: 'blur',type: 'string', required: true, min:6,max :16,message: '密码为长度6至12位之间字符串!'},{validator: this.validateFunction, trigger: 'blur',otherValidate:'repassword',message: '用户名已被占用'}],
    'repassword': [{trigger: 'blur',type: 'string', required: true,message:'请输入确认密码'},{trigger: 'blur',type: 'string', validator: this.validateFunction,equal:'password',message: '两次输入密码不一致!'}]
}
setValidataionContent(generalValidataionContent);

var vueContentObject = new Vue(initializeContentOptions());

