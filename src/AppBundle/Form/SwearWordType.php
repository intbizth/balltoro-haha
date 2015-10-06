<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SwearWordType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('swear', 'text', array(
                'required' => true,
            ))

            ->add('replacement', 'text', array(
                'required' => true,
            ))
        ;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_swear_word';
    }
}
