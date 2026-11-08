import multer from 'multer'
import path from 'path'

const multerMiddleware = multer({
    dest: path.resolve('tmp_files_multer')
})

export { multerMiddleware }
