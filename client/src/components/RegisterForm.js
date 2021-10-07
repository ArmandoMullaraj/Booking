const RegisterForm = ({handleSubmit, name, setName, email, setEmail, password, setPassword,}) => (
    <form onSubmit={handleSubmit} className="mt-3">
            <div className="from-control">
                <label>Your Name</label>
                <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="from-control">
                <label>E-mail</label>
                <input type="text" className="form-control" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="from-control">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
 
            <button disabled={!name || !email || !password} className="btn btn-primary mt-3">Submit</button>
        </form>
);

export default RegisterForm;