


function onChangedContent(){
	
	var nl = '\r\n';
	var xml = '<Game id="' + getVal('id') + '">';
	
	xml += nl + '    <!-- General Information -->';
	xml += nl + '    <Name>' + getVal('title') + '</Name>';
	xml += nl + '    <Icon>' + getVal('icon') + '</Icon>';
	
	var genres = getVal('genre').split(',');
	for(var i=0;i<genres.length;i++){
		xml += nl + '    <Genre>' + genres[i].trim() + '</Genre>';
	}
	xml += nl + '    <Players>' + getVal('players') + '</Players>';
	xml += nl + '    <RequiredHardware>' + getVal('hardware') + '</RequiredHardware>';
	
	xml += nl + '    <!-- Legal Information -->';
	xml += nl + '    <Publisher>' + getVal('publisher') + '</Publisher>';
	xml += nl + '    <Address>' + getVal('address') + '</Address>';
	xml += nl + '    <Support>' + getVal('support') + '</Support>';
	xml += nl + '    <Website>' + getVal('website') + '</Website>';
	xml += nl + '    <License>' + getVal('license') + '</License>';
	
	xml += nl + '    <!-- Presentation -->';
	$(document).find('[name="screenshot"]').each(function(){
		if($(this).val().length > 1)
			xml += nl + '    <Screenshot>' + $(this).val() + '</Screenshot>';
	});
	xml += nl + '    <Description>' + getVal('description') + '</Description>';
	
	xml += nl + '    <!-- Packages -->';
	
	if($('#linux-available').val() == 'true'){
		
		var url = getVal('linux-packageurl');
		var exe = getVal('linux-executable');
		var version = getVal('linux-version');
		var ram = getPerformanceVal(getVal('linux-ram'), 'mb');
		var vram = getPerformanceVal(getVal('linux-vram'), 'mb');
		var cpu = getPerformanceVal(getVal('linux-cpu'), 'ghz');
		var cores = getPerformanceVal(getVal('linux-cores'), '');
		var disc = getPerformanceVal(getVal('linux-disc'), 'gb');
		
		xml += nl + '    <Package platform="linux" executable="' + exe + '" version="' + version + '" ram="' + ram + '" vram="' + vram + '" cpu="' + cpu + '" cores="' + cores + '" disc="' + disc + '">' + url + '</Package>';
	}
	
	if($('#windows-available').val() == 'true'){
		
		var url = getVal('windows-packageurl');
		var exe = getVal('windows-executable');
		var version = getVal('windows-version');
		var ram = getPerformanceVal(getVal('windows-ram'), 'mb');
		var vram = getPerformanceVal(getVal('windows-vram'), 'mb');
		var cpu = getPerformanceVal(getVal('windows-cpu'), 'ghz');
		var cores = getPerformanceVal(getVal('windows-cores'), '');
		var disc = getPerformanceVal(getVal('windows-disc'), 'gb');
		
		xml += nl + '    <Package platform="windows" executable="' + exe + '" version="' + version + '" ram="' + ram + '" vram="' + vram + '" cpu="' + cpu + '" cores="' + cores + '" disc="' + disc + '">' + url + '</Package>';
	}
	
	if($('#macosx-available').val() == 'true'){
		
		var url = getVal('macosx-packageurl');
		var exe = getVal('macosx-executable');
		var version = getVal('macosx-version');
		var ram = getPerformanceVal(getVal('macosx-ram'), 'mb');
		var vram = getPerformanceVal(getVal('macosx-vram'), 'mb');
		var cpu = getPerformanceVal(getVal('macosx-cpu'), 'ghz');
		var cores = getPerformanceVal(getVal('macosx-cores'), '');
		var disc = getPerformanceVal(getVal('macosx-disc'), 'gb');
		
		xml += nl + '    <Package platform="mac" executable="' + exe + '" version="' + version + '" ram="' + ram + '" vram="' + vram + '" cpu="' + cpu + '" cores="' + cores + '" disc="' + disc + '">' + url + '</Package>';
	}
	
	
	xml += nl + '</Game>'
	
	$('#manifest').html(xml);
	
}

function getVal(name){
	return $(document).find('[name="' + name + '"]').val().trim();
}

function getPerformanceVal(val, unit){
	if(val == '')
		return 'any';
	else if(val == 'any')
		return val;
	else
		return val + unit;
}

function onLinuxEnabledChanged(selectObj){
	
	if($(selectObj).val() == 'true')
		$(document).find('input[name^="linux-"]').each(function(){
			$(this).parent().show();
		});
	else
		$(document).find('input[name^="linux-"]').each(function(){
			$(this).parent().hide();
		});
		
	onChangedContent();
}

function onWindowsEnabledChanged(selectObj){
	
	if($(selectObj).val() == 'true')
		$(document).find('input[name^="windows-"]').each(function(){
			$(this).parent().show();
		});
	else
		$(document).find('input[name^="windows-"]').each(function(){
			$(this).parent().hide();
		});
		
	onChangedContent();
}

function onMacOsxEnabledChanged(selectObj){
	
	if($(selectObj).val() == 'true')
		$(document).find('input[name^="macosx-"]').each(function(){
			$(this).parent().show();
		});
	else
		$(document).find('input[name^="macosx-"]').each(function(){
			$(this).parent().hide();
		});
		
	onChangedContent();
}


$(document).ready(function(){
	
	$(document).find('input').on('change', onChangedContent);
	$(document).find('textarea').on('change', onChangedContent);
	
	$('#linux-available').val('false');
	$('#windows-available').val('false');
	$('#macosx-available').val('false');
	
	onLinuxEnabledChanged($('#linux-available').get(0));
	onWindowsEnabledChanged($('#windows-available').get(0));
	onMacOsxEnabledChanged($('#macosx-available').get(0));
});
