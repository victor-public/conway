({init(t,e){this.size=t,this.cells=Array(t).fill().map(()=>Array(t).fill(!1)),this.table=document.createElement("table"),this.isMouseDown=!1,this.interactive=!1;for(let t=0;t<this.size;t++){let e=document.createElement("tr");for(let i=0;i<this.size;i++){let s=document.createElement("td");s.setAttribute("data-col",i),s.setAttribute("data-row",t),e.appendChild(s)}this.table.appendChild(e)}e.appendChild(this.table),document.addEventListener("mousedown",()=>{this.isMouseDown=!0}),document.addEventListener("mouseup",()=>{this.isMouseDown=!1}),this.table.addEventListener("click",({target:t})=>{if(this.interactive&&t.matches("td")){let[e,i]=[t.getAttribute("data-col"),t.getAttribute("data-row")];this.setCellValue(i,e,!this.cells[i][e])}}),this.table.addEventListener("mousemove",({target:t})=>{if(this.interactive&&t.matches("td")&&this.isMouseDown){let[e,i]=[t.getAttribute("data-col"),t.getAttribute("data-row")];this.setCellValue(i,e,!0)}})},setCellValue(t,e,i){let s=this.table.rows[t].cells[e];i?s.classList.add("alive"):s.classList.remove("alive"),this.cells[t][e]=i},getCellValue(t,e){return this.cells[t][e]}}).init(16,document.querySelector("main"));//# sourceMappingURL=index.7d87a4bd.js.map

//# sourceMappingURL=index.7d87a4bd.js.map
