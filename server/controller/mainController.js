const homePage= async (req,res)=>{
        const locals={
            title: 'Notes App',
            description: 'Notes app using Nodejs'
        }
        res.render('index',{
            locals,
            layout: '../views/layouts/frontPage'
        });
}
const aboutPage= async (req,res)=>{
    const locals={
        title: 'Notes App',
        description: 'Notes app using Nodejs'
    }
    res.render('about',locals);
}

module.exports=
{homePage,
aboutPage};