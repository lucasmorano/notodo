module.exports = {
	items:[],
	add:function(data){
 		this.items.push(data);
	},
	get:function(){
		return this.items;
    },
    getItem: function(id){
        return this.items[id];
    }
}