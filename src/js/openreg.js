$(function(){
    $(".inpNoBtn").hover(function(){
        $(this).addClass("inpBtn")
    },function(){
        $(this).removeClass("inpBtn")
    })
    $("#inpBtn").hover(function(){
        $(this).css("backgroundColor","rgba(255,76,76,0.4)")
    },function(){
        $(this).css("backgroundColor","#fff")
    })
})