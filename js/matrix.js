let calcType = "";

$(document).ready(function(){
    // 배열 생성
    $(".createArray").click(function(){
        calcType = $(this).data("type");
        
        $("#resultTbody").empty();

        let x1Array = $("#x1Array").val();
        let y1Array = $("#y1Array").val();
        let x2Array = $("#x2Array").val();
        let y2Array = $("#y2Array").val();

        // validation 체크
        // 빈 값
        if(x1Array == ""){
            alert("첫번째 배열의 행을 입력하세요.");
            $("#x1Array").focus();
            return false;
        }
        if(y1Array == ""){
            alert("첫번째 배열의 열을 입력하세요.");
            $("#y1Array").focus();
            return false;
        }
        if(x2Array == ""){
            alert("두번재 배열의 행을 입력하세요.");
            $("#x2Array").focus();
            return false;
        }
        if(y2Array == ""){
            alert("두번재 배열의 열을 입력하세요.");
            $("#y2Array").focus();
            return false;
        }

        // 7x7
        if(x1Array > 7 || y1Array > 7 || x2Array > 7 || y2Array > 7){
            alert("7보다 클 수 없습니다.");
            return false;
        }

        // 조건
        if(calcType == "multi"){
            if(x1Array != y2Array){
                alert("첫번째 배열의 열과 두번째 배열의 행이 같아야 합니다.");
                return false;
            }
        }else{
            if(x1Array != y1Array || x1Array != x2Array || x1Array != y2Array){
                alert("행과 열의 숫자를 동일하게 입력해 주세요.");
                return false;  
            }
        }

        // 첫번째 배열 그리기
        // 배열 TABLE 생성
        $("#xArrayTbody").empty();
        let xHtml = "";
        let xHeight = 0;
        for(let x=0; x<x1Array; x++){
            xHtml += "<tr>";

            for(let y=0; y<y1Array; y++){
                xHtml += "<td>";
                xHtml += "  <input id='xInput"+x+"_"+y+"' class='emptyInput' type='number' min='1' max='1'>";
                xHtml += "</td>";
            }

            xHtml += "</tr>";
            xHeight += 4;
        }
        $("#xArrayTbody").append(xHtml);

        // 두번째 배열 그리기
        // 배열 TABLE 생성
        $("#yArrayTbody").empty();
        let yHtml = "";
        let yHeight = 0;
        for(let x2=0; x2<x2Array; x2++){
            yHtml += "<tr>";

            for(let y2=0; y2<y2Array; y2++){
                yHtml += "<td>";
                yHtml += "  <input id='yInput"+x2+"_"+y2+"' class='emptyInput' type='number' min='1' max='1'>";
                yHtml += "</td>";
            }
            
            yHtml += "</tr>";
            yHeight += 4;
        }
        $("#yArrayTbody").append(yHtml);

        $("#calcBtn").show();

        // 행열 배열 생성 input readonly
        $(".arrayInput").prop("readonly", true);

        // 값 입력 배열 높이 지정
        let arrayBoxHeight = xHeight;
        if(yHeight > xHeight){
            arrayBoxHeight = yHeight;
        }
        $("#arrayBox").css("height", arrayBoxHeight+"rem");
    });

    // 배열 랜덤 숫자 입력
    $("#inputRandom").click(function(){
        $(".emptyInput").each(function(){
            let rndNum = Math.floor(Math.random()*99);
            $(this).val(rndNum);
        });
    });

    // 배열 초기화
    $("#resetArray").click(function(){
        // 배열생성 입력 값 초기화
        $(".arrayInput").val("");
        $(".arrayInput").prop("readonly", false);
        
        // 생성된 배열 초기화
        $("#xArrayTbody").empty();
        $("#yArrayTbody").empty();
        $("#calcBtn").hide();

        // 영역 초기화
        $("#arrayBox").css("height", "10rem");

        // 결과 초기화
        $("#resultTbody").empty();
    });

    // 계산
    $("#calcBtn").click(function(){
        // validation 빈칸 체크
        let validCheck = true;
        $(".emptyInput").each(function(){
            if($(this).val() == ""){
                if(validCheck){
                    alert("값을 입력해 주세요.");
                    $(this).focus();
                    validCheck = false;

                    return false;
                }
            }
        });
        if(validCheck){
            let x1Array = $("#x1Array").val();
            let y1Array = $("#y1Array").val();

            let x2Array = $("#x2Array").val();
            let y2Array = $("#y2Array").val();

            // 첫번째 공배열 생성
            let array1 = [];
            for(let i=0; i<x1Array; i++){
                array1[i] = [];

                for(let j=0; j<y1Array; j++){
                    array1[i][j] = null;
                }
            }

            // 두번째 공배열 생성
            let array2 = [];
            for(let i=0; i<x2Array; i++){
                array2[i] = [];

                for(let j=0; j<y2Array; j++){
                    array2[i][j] = null;
                }
            }

            // 배열에 입력한 값 저장
            for(let i=0; i<x1Array; i++){
                for(let j=0; j<y1Array; j++){
                    array1[i][j] = $("#xInput"+i+"_"+j+"").val();
                }
            }
            for(let i=0; i<x2Array; i++){
                for(let j=0; j<y2Array; j++){
                    array2[i][j] = $("#yInput"+i+"_"+j+"").val();
                }
            }

            
            // 결과 공배열 생성
            let resultArray = [];
            for(let i=0; i<x1Array; i++){
                resultArray[i] = [];

                for(let j=0; j<y2Array; j++){
                    resultArray[i][j] = null;
                }
            }

            // 행렬 곱셈
            if(calcType == "multi"){ // 곱셈 계산
                for(let i=0; i<x1Array; i++){ // 첫번째 배열 행
                    for(let j=0; j<y2Array; j++){ // 두번째 배열 열
                        let multi = 0;

                        for(let k=0; k<y1Array; k++){
                            multi += array1[i][k] * array2[k][j];
                        }

                        resultArray[i][j] = multi;
                    }            
                }
            }else if(calcType == "plus"){ // 덧셈 계산
                for(let i=0; i<x1Array; i++){
                    for(let j=0; j<x2Array; j++){
                        resultArray[i][j] = Number(array1[i][j]) + Number(array2[i][j]);
                    }
                }
            }else if(calcType == "minus"){ // 뺄셈 계산
                for(let i=0; i<x1Array; i++){
                    for(let j=0; j<x2Array; j++){
                        resultArray[i][j] = Number(array1[i][j]) - Number(array2[i][j]);
                    }
                }
            }

            // 화면 출력
            $("#resultTbody").empty();
            let resultHtml = "";
            for(let i=0; i<x1Array; i++){
                resultHtml += "<tr>";

                for(let j=0; j<y2Array; j++){
                    resultHtml += "<td>";
                    resultHtml += '<span class=resultTbody>' + comma(resultArray[i][j])+ "<span>";
                    resultHtml += "</td>";
                }

                resultHtml += "</tr>";
            }
            $("#resultTbody").append(resultHtml);
        }
    });
});

// 천단위 콤마
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}