class Node {
    constructor(){
        this.children = {};
        this.last = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
        this.word_list = [];
    }
    
    formTrie(keys) {
        for (let key of keys){
            this.insert(key);
        }
    }
    
    insert(key) {
        var node = this.root;
        for (let a of key){ 
            if (!node.children[a]){
		        node.children[a] = new Node();
            }
	       node = node.children[a];
        }
	    node.last = true;
    }    	

    search(key) {
        let node = this.root;
        let found = true;
        for (let a of key){ 
            if (!node.children[a]) {
                found = false;
                break; 
            }
            node = node.children[a];
        }
        return [node, node.last, found];
    }

    suggestionsRec(node, word) {
        if (node.last){
            this.word_list.push(word);
        }
        for (let [a, n] of Object.entries(node.children)) {
            this.suggestionsRec(n, word.concat(a));
        }
    }
    
    printAutoSuggestions(key) {
        let node = this.root;
        let not_found = false;
        let t_word = "";
        for (let a of key) {
            if (!node.children[a]) {
	            not_found = true;
		        break;
            }
            t_word += a;
	        node = node.children[a];
        }   
        if(!!not_found){
            return 0;	    
        } else if (node.last && !node.children) {
            return -1;
        }
        this.suggestionsRec(node, t_word);
        for (let s of this.word_list){
            console.log(s);
        }
        return 1;
    }
}


function main() {
	keys = data; //["a", "app", "apple"];
	key = "Liver";
	status = ["Nope!", "Found"];


	t = new Trie();
	t.formTrie(keys);

	comp = t.printAutoSuggestions(key);

	if(comp == -1){
		console.log("GTFO\t");
	} else if(comp == 0){
		console.log("GTFO NOW\t");
	}
}



var data;
json = fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
	.then(d => {
		console.log(d);
		return d.json();
	}).then(j => {
		console.log(j);
		data = Object.values(j).map(o => o.name);
	}).then(main);
