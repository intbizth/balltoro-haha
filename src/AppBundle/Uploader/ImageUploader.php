<?php

namespace AppBundle\Uploader;

use AppBundle\Model\ImageInterface;
use Gaufrette\Filesystem;

class ImageUploader
{
    protected $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    /**
     * @param ImageInterface $image
     */
    public function upload(ImageInterface $image)
    {
        if (!$image->hasFile()) {
            return;
        }

        // remove older path
        if (null !== $image->getPath() && $this->filesystem->has($image->getPath())) {
            $this->remove($image->getPath());
        }

        do {
            if (!$ext = $image->getFile()->getExtension()) {
                list($m, $ext) = explode('/', $image->getFile()->getClientMimeType());
            }

            $hash = md5(uniqid(mt_rand(), true));
            $path = $this->expandPath($hash.'.'.$ext);
        } while ($this->filesystem->has($path));

        $image->setPath($path);

        $this->filesystem->write(
            $image->getPath(),
            file_get_contents($image->getFile()->getPathname())
        );
    }

    /**
     * @param $path
     *
     * @return bool
     */
    public function remove($path)
    {
        return $this->filesystem->delete($path);
    }

    /**
     * @param $path
     *
     * @return string
     */
    private function expandPath($path)
    {
        return sprintf(
            '%s/%s/%s',
            substr($path, 0, 2),
            substr($path, 2, 2),
            substr($path, 4)
        );
    }
}
