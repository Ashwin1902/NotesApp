exports.dashboard= async (req,res)=>{
    const locals={
        title: 'Dashboard',
        description: 'Notes app using Nodejs'
    }
    res.render('dashboard/index',{
        locals,
        layout: '../views/layouts/dashboard'
    });
}