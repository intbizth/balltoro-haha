<?php

namespace AppBundle\Model;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface ImageInterface
{
    /**
     * @return Boolean
     */
    public function hasFile();

    /**
     * @return null|\SplFileInfo|UploadedFile
     */
    public function getFile();

    /**
     * @param \SplFileInfo $file
     */
    public function setFile(\SplFileInfo $file = null);

    /**
     * @return Boolean
     */
    public function hasPath();

    /**
     * @return string
     */
    public function getPath();

    /**
     * @param string $path
     */
    public function setPath($path);
}
