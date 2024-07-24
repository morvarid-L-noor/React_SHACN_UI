import MyBreadCrumb from '../breadcrumb';

type Props = {
  title?: string;
  description: string;
  extraNode?: React.ReactNode;
  /**
   * @param customRoutes - Custom routes to be used in the breadcrumb
   * @description should be a string with the routes separated by '/'
   * @example '/root/page1/page2'
   */
  customRoutes?: string;
};

function PageHeader({ title, description, extraNode, customRoutes }: Readonly<Props>) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {title ? (
          <p className="mb-4 text-2xl text-gray-800 dark:text-gray-300">{title}</p>
        ) : (
          <MyBreadCrumb customRoutes={customRoutes} />
        )}
        {extraNode}
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default PageHeader;
