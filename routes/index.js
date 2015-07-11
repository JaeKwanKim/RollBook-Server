var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '출석부' });
});

router.get('/schedule', function(req, res) {
    req.getConnection(function(err, connection) {
//        var input = "2015-W36";
	connection.query('SELECT * FROM schedule', function(err, rows) {
	    if(err) console.log("Error seleting : %s",err);
	    res.render('schedule', {
		title: '강의일정',
		data: rows });
	});
    });
//	connection.query('SELECT * FROM schedule WHERE weeknum = ?',[week_data], function(err, rows) {
//	    if(err) console.log("Error seleting : %s",err);
//            fs.writeFile('/data/schedule.json', rows, 'utf8', function(err) {
//		console.log('Write file Async complete'); });  
//	});
//    });
   
});

router.get('/schedule/:id', function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
	connection.query('SELECT * FROM schedule WHERE weeknum = ?',[id], function(err, rows) {
	    res.redirect('schedule', {
		data: rows });
	});
    });
});

router.post('/schedule/save', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection) {
        var data = {
	    weeknum: input.weeknum, mon1: input.mon1, mon2: input.mon2, mon3: input.mon3, mon4: input.mon4, mon5: input.mon5, mon6: input.mon6, mon7: input.mon7, mon8: input.mon8, mon9: input.mon9,
	    tue1: input.tue1, tue2: input.tue2, tue3: input.tue3, tue4: input.tue4, tue5: input.tue5, tue6: input.tue6, tue7: input.tue7, tue8: input.tue8, tue9: input.tue9,
	    wed1: input.wed1, wed2: input.wed2, wed3: input.wed3, wed4: input.wed4, wed5: input.wed5, wed6: input.wed6, wed7: input.wed7, wed8: input.wed8, wed9: input.wed9,
	    thu1: input.thu1, thu2: input.thu2, thu3: input.thu3, thu4: input.thu4, thu5: input.thu5, thu6: input.thu6, thu7: input.thu7, thu8: input.thu8, thu9: input.thu9,
	    fri1: input.fri1, fri2: input.fri2, fri3: input.fri3, fri4: input.fri4, fri5: input.fri5, fri6: input.fri6, fri7: input.fri7, fri8: input.fri8, fri9: input.fri9,
	    sat1: input.sat1, sat2: input.sat2, sat3: input.sat3, sat4: input.sat4, sat5: input.sat5, sat6: input.sat6, sat7: input.sat7, sat8: input.sat8, sat9: input.sat9        
	};
        var query = connection.query("INSERT INTO schedule FROM schedule SET ?",data, function(err, rows) {
	    if(err) console.log("Error seleting : %s",err);
            res.redirect('/schedule'); 
	    });
	});
});

router.post('/schedule/resave', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection) {
        var data = {
	    weeknum: input.weeknum, mon1: input.mon1, mon2: input.mon2, mon3: input.mon3, mon4: input.mon4, mon5: input.mon5, mon6: input.mon6, mon7: input.mon7, mon8: input.mon8, mon9: input.mon9,
	    tue1: input.tue1, tue2: input.tue2, tue3: input.tue3, tue4: input.tue4, tue5: input.tue5, tue6: input.tue6, tue7: input.tue7, tue8: input.tue8, tue9: input.tue9,
	    wed1: input.wed1, wed2: input.wed2, wed3: input.wed3, wed4: input.wed4, wed5: input.wed5, wed6: input.wed6, wed7: input.wed7, wed8: input.wed8, wed9: input.wed9,
	    thu1: input.thu1, thu2: input.thu2, thu3: input.thu3, thu4: input.thu4, thu5: input.thu5, thu6: input.thu6, thu7: input.thu7, thu8: input.thu8, thu9: input.thu9,
	    fri1: input.fri1, fri2: input.fri2, fri3: input.fri3, fri4: input.fri4, fri5: input.fri5, fri6: input.fri6, fri7: input.fri7, fri8: input.fri8, fri9: input.fri9,
	    sat1: input.sat1, sat2: input.sat2, sat3: input.sat3, sat4: input.sat4, sat5: input.sat5, sat6: input.sat6, sat7: input.sat7, sat8: input.sat8, sat9: input.sat9        
	};
        var query = connection.query("UPDATE schedule set ? WHERE weeknum = ?",[data, data.weeknum], function(err, rows) {
	    if(err) console.log("Error seleting : %s",err);
            res.redirect('/schedule'); 
	    });
	});
});

router.get('/classinfo', function(req, res) {
    req.getConnection(function(err,connection) {
	connection.query('SELECT * FROM classinfo',function(err, rows) {
	    if(err) console.log("Error seleting : %s",err);
	    res.render('classinfo', { 	
		title: '강의정보',
		data: rows   });
	    });
	});
});

router.get('/classinfo/add', function(req, res) {
    res.render('classinfo/add', {
	title: '강의정보 수정/추가' });
});

router.post('/classinfo/add_classinfo', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection) {
	var data = {
	    classname: input.classname,
	    profe: input.profe,
	    hp: input.hp,
	    email: input.email,
	    intro: input.intro
	};

	var query = connection.query("INSERT INTO classinfo set ?",data, function(err, rows) {
	    if(err) console.log("Error inserting: %s", err);
	    res.redirect('/classinfo');
	});
   });
});

router.get('/classinfo/delete/:id', function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
	connection.query("DELETE FROM classinfo WHERE classname = ?",[id], function(err, rows) {
	    if(err) console.log("Error deleting : %s", err);
	    res.redirect('/classinfo');
	});
    });
});

router.get('/classinfo/edit/:id', function(req, res) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
	connection.query("SELECT * FROM classinfo WHERE classname = ?",[id], function(err, rows) {
	    if(err) console.log("Error editing : %s", err)
	    res.render('classinfo/edit', {
		title: "강의정보 변경",
		data: rows });
	});
    });
});

router.post('/classinfo/edit_classinfo', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
	var data = {
	    classname: input.classname,
	    profe: input.profe,
	    hp: input.hp,
	    email: input.email,
	    intro: input.intro };

	connection.query("UPDATE classinfo set ? WHERE classname = ?",[data, data.classname], function(err, rows) {
	    if(err) console.log("Error Updating : %s", err);
	    res.redirect('/classinfo');
	});
    });
});



module.exports = router;
