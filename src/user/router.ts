import {NextFunction, Request, Response, Router} from "express"
import {User} from "./model/User";
import {UserService} from "./service/UserService";

const router = Router();

const wrapAsync = (fn: Function) => {
	return (req: Request, res:Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

router.get('/', wrapAsync(async (req: Request, res: Response) => {
	const users: User[] = await UserService.findAll(req.query);
	res.json(users);
}));

router.post('/', wrapAsync(async (req: Request, res: Response) => {
	const user: User = await UserService.create(req.body);
	res.json(user);
}));

router.put('/:id', wrapAsync(async (req: Request, res: Response) => {
	const user: User = await UserService.update(req.params.id, req.body);
	res.json(user);
}));

router.get('/:id', wrapAsync(async (req: Request, res: Response) => {
	const user: User = await UserService.findOne(req.params.id);
	res.json(user);
}));

router.delete('/:id', wrapAsync(async (req: Request, res: Response) => {
	const user: User = await UserService.remove(req.params.id);
	res.json(user).send();
}));

export default router
