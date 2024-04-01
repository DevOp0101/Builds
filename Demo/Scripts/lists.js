function persistentList() {
    var list = [];
    return {
        add: function(item) {
            list.push(item);
        },
        remove: function(index) {
            if (index >= 0 && index < list.length) {
                list.splice(index, 1);
            }
        },
        contents: function(index) {
            return list[index];
        },
        getList: function() {
            return list;
        },
        clear: function() {
            list = [];
        },
        count: function() {
            return list.length;
        }
    };
}
